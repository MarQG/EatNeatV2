const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const BlogSchema = new Schema({
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

var blog = mongoose.model("Blog", BlogSchema);

module.exports = blog;