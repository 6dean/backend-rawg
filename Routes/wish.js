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
    if (wishlistArray.length === 0) {
      User.wishlist.push(wish);
      User.save();
    } else {
      const pushing = () => {
        User.wishlist.push(wish);
        User.save();
      };
      const isFound = wishlistArray.some((element) => {
        if (element.id === wish.id) {
          return true;
        }
      });
      isFound ? null : pushing();
    }
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
