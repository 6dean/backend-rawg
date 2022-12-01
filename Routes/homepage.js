const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  const number = req.query.number || "";
  const search = req.query.search || "";
  const platform = req.query.platform || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=19f566421f19451c81f113f84a69f091`
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
