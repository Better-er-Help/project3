const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  message: String,
  name: String,
  timestamp: String,
  received: Boolean,
});

const Paws = mongoose.model("messagecontents", UserSchema);

module.exports = Paws;
