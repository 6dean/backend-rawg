const { stringify } = require("crypto-js/enc-base64");
const mongoose = require("mongoose");

const Comment = mongoose.model("Comment", {
  game_id: String,
  game_name: String,
  game_img: String,
  username: String,
  token: String,
  date: Object,
  text: String,
  member: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Member",
  },
});

module.exports = Comment;
