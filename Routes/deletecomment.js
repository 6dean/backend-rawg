const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");
const Comment = require("../Models/Comment");

router.put("/deletecomment", async (req, res) => {
  const { game_id, token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const reviewsArray = User.comments;

    reviewsArray.splice(
      reviewsArray.findIndex((a) => a.game_id === game_id),
      1
    );

    await Comment.findOneAndDelete({
      token: token,
      game_id: game_id,
    });

    User.save();
    res.status(200).json(reviewsArray);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

module.exports = router;
