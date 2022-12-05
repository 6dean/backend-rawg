const express = require("express");
const router = express.Router();

const Comment = require("../Models/Comment");

router.post("/commentary", async (req, res) => {
  const { game_id, username, token, date, review } = req.body;
  try {
    const newComment = new Comment({
      game_id: game_id,
      username: username,
      token: token,
      date: date,
      text: review,
    });

    await newComment.save();

    const validComment = {
      id: newComment._id,
      game_id: game_id,
      username: username,
      token: token,
      date: date,
      text: review,
    };

    res.status(200).json(validComment);
  } catch (error) {
    console.log(error);
    res.status(406).json({ message: error });
  }
});

module.exports = router;
