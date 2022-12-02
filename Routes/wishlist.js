const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.post("/wishlist", async (req, res) => {
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const wishlistArray = User.wishlist;
    res.status(200).json(wishlistArray);
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
