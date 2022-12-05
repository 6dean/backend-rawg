const { stringify } = require("crypto-js/enc-base64");
const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  game_id: String,
  username: String,
  token: String,
  date: Object,
  text: String,
});

module.exports = Comment;
