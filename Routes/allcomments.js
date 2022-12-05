const express = require("express");
const router = express.Router();

const Comment = require("../Models/Comment");

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

module.exports = router;
