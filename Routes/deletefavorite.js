const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/deletefavorite", async (req, res) => {
  const { deleteId, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const favoriteArray = User.favorites;

    console.log(favoriteArray);
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
