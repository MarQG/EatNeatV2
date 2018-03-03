const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  blog_id: {
    type: String,
    required: true
  },
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

var comment = mongoose.model("Comment", CommentSchema);

module.exports = comment;