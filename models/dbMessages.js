const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  roomName: String,
});

module.exports = mongoose.model("messagecontents", messageSchema);
