const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

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
