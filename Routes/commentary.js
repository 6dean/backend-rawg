const express = require("express");
const router = express.Router();

const Comment = require("../Models/Comment");
const Member = require("../Models/Member");

router.post("/commentary", async (req, res) => {
  const { game_id, game_name, game_img, username, token, date, review } =
    req.body;
  try {
    const newComment = new Comment({
      game_id: game_id,
      game_name: game_name,
      game_img: game_img,
      username: username,
      token: token,
      date: date,
      text: review,
    });

    await newComment.save();

    const User = await Member.findOne({
      token: token,
    });
    const reviewsArray = User.comments;

    reviewsArray.push({
      game_id: game_id,
      game_name: game_name,
      game_img: game_img,
      date: date,
      text: review,
    });
    User.save();

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
