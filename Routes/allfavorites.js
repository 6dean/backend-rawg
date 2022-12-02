const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.post("/allfavorites", async (req, res) => {
  console.log(req.body);
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const favoriteArray = User.favorites;
    res.status(200).json(favoriteArray);
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
