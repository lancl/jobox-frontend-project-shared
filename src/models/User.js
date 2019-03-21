const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

// Note: isHost is true, then more access for the user (e.g. create a chatroom)
const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  icon: { type: String, required: true },
  updateTime: Date,
  isHost: Boolean
});
userSchema.plugin(uniqueValidator);

module.exports = userSchema;
