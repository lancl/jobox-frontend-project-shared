const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/live-qa");

// Note: skipping roomID, to keep it simple here
const roomSchema = mongoose.Schema({
  roomName: { type: String, required: true, unique: true },
  hostName: { type: String, required: true },
  topic: { type: String, required: true },
  icon: { type: String, required: true },
  startTime: Date,
  endTime: Date
});

const Rooms = mongoose.model("Rooms", roomSchema);

// About: get all rooms/sessions from the DB collection, rooms
const getRooms = function(callback) {
  Rooms.find(function(err, rooms) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, rooms);
    }
  });
};

const addRooms = function(roomObj, callback) {
  Rooms.create(roomObj, function(err, data) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, data);
    }
  });
};

module.exports.roomSchema = roomSchema;
module.exports.getRooms = getRooms;
module.exports.addRooms = addRooms;
