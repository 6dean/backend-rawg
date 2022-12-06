require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/home", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page_size=${number}&search=${search}&page=${page}`,
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
