const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  text: {
    type: String,
    required: true
  }
});

var blog = mongoose.model("Blog", UserSchema);

module.exports = blog;