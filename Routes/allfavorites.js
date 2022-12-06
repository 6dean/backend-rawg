const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

///------ SEE ALL FAVORITES ON USER-PAGE ------///

router.post("/allfavorites", async (req, res) => {
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const favoriteArray = User.favorites;
    res.status(200).json(favoriteArray);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

///------ ADD FAVORITE ON USER-PAGE ------///

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
    res.status(406).json({ message: error });
  }
});

///------ DELETE FAVORITE ON USER-PAGE ------///

router.put("/deletefavorite", async (req, res) => {
  const { gameId, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const favoriteArray = User.favorites;

    favoriteArray.splice(
      favoriteArray.findIndex((a) => a.id === gameId),
      1
    );

    User.save();
    res.status(200).json(favoriteArray);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

module.exports = router;
