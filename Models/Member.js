const mongoose = require("mongoose");

const Member = mongoose.model("Member", {
  email: String,
  username: String,
  community: { favorites: [], comments: [] },
  token: String,
  hash: String,
  salt: String,
});

module.exports = Member;
