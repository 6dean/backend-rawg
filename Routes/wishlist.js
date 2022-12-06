const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

///------ SEE WISHLIST ON USER-PAGE ------///

router.post("/wishlist", async (req, res) => {
  const { token } = req.body;
  try {
    if (token) {
      const User = await Member.findOne({
        token: token,
      });
      const wishlistArray = User.wishlist;
      res.status(200).json(wishlistArray);
    } else {
      null;
    }
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

///------ ADD GAME IN WISHLIST ON USER-PAGE & GAME-PAGE ------///

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
    res.status(406).json({ message: error });
  }
});

///------ DELETE GAME IN WISHLIST ON USER-PAGE & GAME-PAGE ------///

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
    res.status(200).json(wishlistArray);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

module.exports = router;
