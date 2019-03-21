const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/live-qa");

// Note: if the user is a host, then his/her messages will be
// displayed on the right side (of main section)
const messageSchema = mongoose.Schema({
  user: { type: String, required: true },
  isHost: { type: Boolean },
  message: { type: String, required: true },
  timeStamp: { type: String },
  time: { type: String },
  roomName: { type: String, required: true }
});

const Messages = mongoose.model("Messages", messageSchema);

// About: get all messages in a selected room/session
const getMessages = function(room, callback) {
  Messages.find({ roomName: room }, function(err, messages) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, messages);
    }
  });
};

// Add a new message object to the DB collection, messages
const addMessage = function(messageObj, callback) {
  Messages.create(messageObj, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports.messageSchema = messageSchema;
module.exports.addMessage = addMessage;
module.exports.getMessages = getMessages;
