const express = require("express");
const router = express.Router();

const Comment = require("../Models/Comment");
const Member = require("../Models/Member");

///------ SEE ALL COMMENTS ON GAME-PAGE ------///

router.post("/allcomments", async (req, res) => {
  const { game_id } = req.body;
  try {
    const review = await Comment.find({
      game_id: game_id,
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(406).json({ message: error });
  }
});

///------ SEE ALL COMMENTS ON USER-PAGE ------///

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

///------ POST A COMMENT ON GAME-PAGE ------///

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

///------ DELETE COMMENT ON GAME-PAGE AND USER-PAGE ------///

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
