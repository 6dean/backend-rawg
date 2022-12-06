require("dotenv").config;

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/RAWG");

const homePage = require("./Routes/homepage");
const joinUs = require("./Routes/joinus");
const login = require("./Routes/login");
const gamedetails = require("./Routes/gamedetails");
const yourprofile = require("./Routes/yourprofile");
const allfavorites = require("./Routes/allfavorites");
const wishlist = require("./Routes/wishlist");
const allcomments = require("./Routes/allcomments");
const listpages = require("./Routes/listpages");

app.use(express.json());
app.use(cors());

// HOME PAGE
app.use(homePage);

// SIGN IN & LOGIN
app.use(joinUs);
app.use(login);

// ALL PAGES FROM SIDEBAR
app.use(listpages);

// GAME-PAGE DETAILS
app.use(gamedetails);

// USER PROFILE
app.use(yourprofile);

// ADD FAV - READ ALL FAV USER-PAGE - DELETE FAVORITES
app.use(allfavorites);

// ADD WISH - READ WISHLIST USER-PAGE - DELETE WISH
app.use(wishlist);

// POST - READ ALL COMMENTS GAME-PAGE - READ ALL USER-PAGE - DELETE COMMENTS
app.use(allcomments);

// ERROR PAGE
app.all("*", (req, res) => {
  res.status(404).json({ message: "Ooops , are you lost ?" });
});

app.listen(3000, () => {
  console.log("Server is now online /!\\ 🎮");
});
