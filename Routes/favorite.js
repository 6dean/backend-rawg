const express = require("express");
const router = express.Router();

const Member = require("../Models/Member");

router.put("/favorite", async (req, res) => {
  const { game, token } = req.body;
  try {
    const filter = { token: token };
    const update = { community: { favorites: game } };

    const User = await Member.findOneAndUpdate(filter, update, {
      new: true,
    });
    console.log(User);
  } catch (error) {
    console.log(error + "hihi");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
