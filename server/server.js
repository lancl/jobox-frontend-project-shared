// Express server
const express = require("express");
const app = express();

// More config, for the Express server
const path = require("path");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Hosting client files, in __dirname (directory)
// app.use(express.static(path.join(__dirname, "public")));
let parentDir = __dirname.split(path.sep);
parentDir.pop();
parentDir = parentDir.join("/");
console.log("parentDir: " + parentDir); // For testing

app.use(express.static(path.join(parentDir, "public")));
const PORT = 8000;

// Place socket on top of the Express server
const http = require("http").createServer(app);
const io = require("socket.io")(http);

// Note: con, the DB connection, is used for sockets only here (for users and messages);
// whereas another DB connection is used elsewhere (for rooms)
const mongoose = require("mongoose");
const con = mongoose.createConnection("mongodb://localhost/live-qa");

const roomController = require("../src/models/Room");

const UserSocket = require("../src/socket/UserSocket.js");
const userSocket = new UserSocket(con);

const msgController = require("../src/models/Message");

/**
 *
 * For chatroom: the main page, with messages
 *
 */

// GET: direct to chatroom.html
app.get("/chatroom", function(req, res) {
  console.log("redirect to: chatroom");
  res.sendFile(path.join(parentDir, "./public/chatroom.html"));
});

// GET: get all Q&A sessions/rooms
app.get("/qa", function(req, res) {
  console.log("Getting all Q&A sessions");
  // Get data from DB
  roomController.getRooms((err, data) => {
    if (err) {
      res.status(500).send("Error, in getting data from DB");
    } else {
      res.send(data);
      res.status(200);
    }
  });
});

// GET: get 1 Q&A session, based on its roomName (unique)
// Sample query: http://localhost:8000/qa/Banana
app.get("/qa/:roomName", function(req, res) {
  let room = req.params.roomName;

  console.log("Getting all messages of selected session, " + room);

  // Use DB's controller
  msgController.getMessages(room, (err, data) => {
    if (err) {
      res
        .status(400)
        .send("Error, in getting messages in the selected session.");
    } else {
      res.send(data);
    }
  });
});

// POST: add a new message, under 1 Q&A session/room
// Note: used socket.io instead
/*
app.post("qa/:roomName", function(req, res) {
  msgController.addMessage(newData, (err, data) => {
    if (err) {
      res.send("Error, in posting a new message to DB");
    } else {
      // res.send(data);
      res.send("Success! Posted a new message to DB.");
    }
  });
});
*/

/**
 *
 * Connect to socket.io, for live messages
 * Event names: "connection", "username", "message", "disconnect"
 *
 */

name_id_dict = {}; // Key as user name, value as socket ID

// Event "connection"
io.on("connection", socket => {
  // Event "username"
  socket.on("username", username => {
    console.log("Connect: " + socket.id + ", " + username);
    name_id_dict[username] = socket.id;
  });

  // Event "message", that POST a message to DB
  socket.on("message", (msgObj, cb) => {
    msgObj = JSON.parse(msgObj); // Convert back to JSON format

    // Use DB's controller, to add the new message
    msgController.addMessage(msgObj, (err, data) => {
      if (err) {
        console.log("Error, in posting a new message to DB");
      } else {
        console.log("Success! Posted a new message to DB.");
      }
    });

    // cb("[ack] server received: " + msgObj);

    const fullMsg = JSON.stringify(msgObj);
    io.to(name_id_dict[msgObj.user]).emit("message", fullMsg);
  });

  // Event "disconnect"
  socket.on("disconnect", () => {
    let id = socket.id;
    let username = "";
    for (let key in name_id_dict) {
      let value = name_id_dict[key];
      if (value === id) {
        username = key;
        break;
      }
    }
    console.log("Disconnected: " + id + ", " + username);
    name_id_dict[username] = null;
  });
});

/**
 *
 * For user signup and login (at the start of the process)
 *
 */

// For user signup
app.get("/signup", function(req, res) {
  console.log("redirect to: signup");
  res.sendFile(path.join(parentDir, "./public/signup.html"));
});
app.post("/user/signup", function(req, res) {
  var newUser = {
    username: req.body.username,
    password: req.body.password,
    icon: "./assets/default.png",
    updateTime: req.body.updateTime
  };

  userSocket.storeUsers(newUser, res);
});

// For user login
app.get(["/", "/login"], function(req, res) {
  console.log("redirect to: login");
  res.sendFile(path.join(parentDir, "./public/login.html"));
});
app.post("/user/login", function(req, res) {
  var myUser = {
    username: req.body.username,
    password: req.body.password,
    icon: "./assets/"
    // updateTime: req.body.updateTime
  };

  userSocket.checkUsers(myUser, res);
});

// At the end, spin up the server
http.listen(PORT, function(err) {
  if (err) {
    console.log(err);
  }
  console.log("listen on port " + PORT);
});
