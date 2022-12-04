require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/alltimetop", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?metacritic=90,100&key=${process.env.RAWG_KEY}&page_size=${number}&search=${search}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
