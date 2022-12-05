const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.post("/allreviews", async (req, res) => {
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const reviews = User.comments;
    res.status(200).json(reviews);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

module.exports = router;
