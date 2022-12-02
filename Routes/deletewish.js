const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/deletewish", async (req, res) => {
  const { gameId, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const wishlistArray = User.wishlist;

    wishlistArray.splice(
      wishlistArray.findIndex((a) => a.id === gameId),
      1
    );

    User.save();
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
