require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

router.get("/stores", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/stores?key=${process.env.RAWG_KEY}`,
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