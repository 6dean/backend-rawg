const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  email: String,
  username: String,
  favorites: { type: Array, default: null },
  wishlist: { type: Array, default: null },
  comments: { type: Array, default: null },
  token: String,
  hash: String,
  salt: String,
  avatar: Object,
});

module.exports = Member;
