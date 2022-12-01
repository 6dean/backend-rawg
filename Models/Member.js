const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  email: String,
  username: String,
  avatar: Object,
  token: String,
  hash: String,
  salt: String,
});

module.exports = Member;
