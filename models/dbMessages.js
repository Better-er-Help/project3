const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
  roomName: String,
  auth: {type:Boolean}
});

module.exports = mongoose.model("messagecontents", messageSchema);
