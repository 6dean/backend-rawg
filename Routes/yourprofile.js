const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/profile", async (req, res) => {
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    console.log(User);

    res.status(200).json(User);
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
