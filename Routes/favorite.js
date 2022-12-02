const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/favorite", async (req, res) => {
  const { favorite, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const favoriteArray = User.favorites;
    if (favoriteArray.length === 0) {
      User.favorites.push(favorite);
      User.save();
    } else {
      const pushing = () => {
        User.favorites.push(favorite);
        User.save();
      };
      const isFound = favoriteArray.some((element) => {
        if (element.id === favorite.id) {
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
