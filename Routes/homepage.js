const express = require("express");

const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=d63135d20b08493989713a8f5f2586e3`
    );
    res.json(response.data);
    console.log(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
