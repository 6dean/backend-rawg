const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/wish", async (req, res) => {
  const { wish, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const wishlistArray = User.wishlist;
    console.log();

    wishlistArray.find((obj) => {
      if (obj === wish) {
        null;
      } else {
        console.log("je push");
        // User.wishlist.push(wish);
        // User.save();
      }
    });
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
