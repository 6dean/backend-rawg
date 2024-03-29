require("dotenv").config();
const express = require("express");
const router = express.Router();
const axios = require("axios");

/// ------ HOME

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

/// ------ GAME DETAILS

router.get("/gamedetails", async (req, res) => {
  const id = req.query.id || "";
  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games/${id}?key=${process.env.RAWG_KEY}`,

      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

// CONTAIN ALL PAGES FROM THE SIDEBAR (IN THE SAME ORDER)

/// ------------------------------------------------------
/// ------ REVIEWS ===> allcomments.js
/// ------ YOUR PAGE => member.js
/// ------ WISHLIST ==> wishlist.js
/// ------ FAVORITES => allfavorites.js
/// ------------------------------------------------------

/// ------ LAST 30 DAYS

router.get("/last30", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;

  const dateNow = new Date();
  const thirtyDaysAgo = new Date(dateNow.getTime() - 30 * 24 * 60 * 60 * 1000); // 30 jours en millisecondes

  const validDateNow = JSON.stringify(dateNow).slice(1, 11);
  const validDateThirty = JSON.stringify(thirtyDaysAgo).slice(1, 11);

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=${validDateThirty},${validDateNow}&page_size=${number}&search=${search}&page=${page}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ THIS WEEK

router.get("/thisweek", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;

  const dateNow = new Date();
  const sevenDaysAgo = new Date(dateNow.getTime() - 7 * 24 * 60 * 60 * 1000); // 30 jours en millisecondes

  const validDateNow = JSON.stringify(dateNow).slice(1, 11);
  const validDateSeven = JSON.stringify(sevenDaysAgo).slice(1, 11);

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=${validDateSeven},${validDateNow}&page_size=${number}&search=${search}&page=${page}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ NEXT WEEK

router.get("/nextweek", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;

  const dateNow = new Date();
  const sevenDaysAfter = new Date(dateNow.getTime() + 7 * 24 * 60 * 60 * 1000); // 30 jours en millisecondes

  const validDateNow = JSON.stringify(dateNow).slice(1, 11);
  const validDateSeven = JSON.stringify(sevenDaysAfter).slice(1, 11);

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=${validDateNow},${validDateSeven}&page_size=${number}&search=${search}&page=${page}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ BEST OF THE YEAR

router.get("/bestoftheyear", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2022-01-01,2022-12-31&metacritic=80,100&page_size=${number}&search=${search}&page=${page}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ POPULAR IN 2021

router.get("/popular", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&dates=2021-01-01,2021-12-31&metacritic=80,100&page_size=${number}&search=${search}&page=${page}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ ALL TIME TOP 250

router.get("/alltimetop", async (req, res) => {
  const number = req.query.page_size || "";
  const search = req.query.search || "";
  const page = req.query.page || 1;

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?metacritic=90,100&key=${process.env.RAWG_KEY}&page_size=${number}&search=${search}&page=${page}`,
      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ PLATFORMS

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

/// ------ PLATFORMS NAME => onClick => GAMES FROM EACH PLATFORM

router.get("/listingplatform", async (req, res) => {
  const search = req.query.search || "";
  const platform = req.query.platforms || "";
  const page = req.query.page || "";

  try {
    const response = await axios.get(
      `https://api.rawg.io/api/games?key=${process.env.RAWG_KEY}&search=${search}&platforms=${platform}&page=${page}`,

      {
        headers: { "accept-encoding": "*" },
      }
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

/// ------ STORES

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

/// ------ GENRES

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

/// ------ DEVELOPERS

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
