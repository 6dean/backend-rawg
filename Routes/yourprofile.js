const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/profile", async (req, res) => {
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const UserInfos = {
      Username: User.username,
      Email: User.email,
      Favorites: User.favorites,
      Wishlist: User.wishlist,
      Reviews: User.comments,
    };
    res.status(200).json(UserInfos);
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
