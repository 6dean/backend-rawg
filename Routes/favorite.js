const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/favorite", async (req, res) => {
  const { favorite, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });

    User.favorites.push(favorite);
    User.save();
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
