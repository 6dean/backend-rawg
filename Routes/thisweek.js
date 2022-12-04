require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/thisweek", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2022-12-05,2022-12-20&page_size=${number}&search=${search}`,
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
