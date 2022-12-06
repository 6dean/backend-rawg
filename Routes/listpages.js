require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

// CONTAIN ALL PAGES FROM THE SIDEBAR (IN THE SAME ORDER)

// LAST 30 DAYS

router.get("/last30", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2022-09-08,2022-12-08&page_size=${number}&search=${search}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// THIS WEEK

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

// NEXT WEEK

router.get("/nextweek", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2022-12-15,2023-01-10&page_size=${number}&search=${search}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// BEST OF THE YEAR

router.get("/bestoftheyear", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2022-01-01,2022-12-31&metacritic=80,100&page_size=${number}&search=${search}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// POPULAR IN 2021

router.get("/popular", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2021-01-01,2021-12-31&metacritic=80,100&page_size=${number}&search=${search}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// ALL TIME TOP 250

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

// PLATFORMS

router.get("/platforms", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/platforms?key=${process.env.RAWG_KEY}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// PLATFORMS NAME => onClick => GAMES FROM EACH PLATFORM

router.get("/listingplatform", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const platform = req.query.platforms || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&page_size=${number}&search=${search}&platforms=${platform}`,

      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// STORES

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

// GENRES

router.get("/genres", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/genres?key=${process.env.RAWG_KEY}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// DEVELOPERS

router.get("/developers", async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/developers?key=${process.env.RAWG_KEY}`,
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
