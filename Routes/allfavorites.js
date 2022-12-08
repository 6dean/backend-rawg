const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

///------ SEE ALL FAVORITES ON USER-PAGE ------///

router.post("/allfavorites", async (req, res) => {
  // I SEND MY VALUES TO BACKEND
  const { token } = req.body;
  try {
    // FIND USER IN DB
    const User = await Member.findOne({
      token: token,
    });
    // CHOOSE ARRAY IN MODEL
    const favoriteArray = User.favorites;
    // SEND ARRAY AS RESPONSE IN FRONT
    res.status(200).json(favoriteArray);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

///------ ADD FAVORITE ON USER-PAGE ------///

router.put("/favorite", async (req, res) => {
  // I SEND MY VALUES TO BACKEND
  const { favorite, token } = req.body;
  try {
    // FIND USER IN DB
    const User = await Member.findOne({
      token: token,
    });

    // CHOOSE ARRAY IN MODEL
    const favoriteArray = User.favorites;

    //ARRAY EMPTY ? I PUSH
    if (favoriteArray.length === 0) {
      User.favorites.push(favorite);
      User.save();
    } else {
      //PUSHING FUNCTION
      const pushing = () => {
        User.favorites.push(favorite);
        User.save();
      };
      // ID EXIST IN FAVORITE ARRAY?
      const isFound = favoriteArray.some((element) => {
        if (element.id === favorite.id) {
          return true;
        }
      });
      // ID isFOUND ? NO PUSH!
      isFound ? null : pushing();
    }
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

///------ DELETE FAVORITE ON USER-PAGE ------///

router.put("/deletefavorite", async (req, res) => {
  // I SEND MY VALUES TO BACKEND
  const { gameId, token } = req.body;
  try {
    // FIND USER IN DB
    const User = await Member.findOne({
      token: token,
    });
    // CHOOSE ARRAY IN MODEL
    const favoriteArray = User.favorites;

    // I DELETE FAV
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
