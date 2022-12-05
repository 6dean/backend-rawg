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
const favorite = require("./Routes/favorite");
const allfavorites = require("./Routes/allfavorites");
const deletefavorite = require("./Routes/deletefavorite");
const wish = require("./Routes/wish");
const wishlist = require("./Routes/wishlist");
const deletewish = require("./Routes/deletewish");
const commentary = require("./Routes/commentary");
const allcomments = require("./Routes/allcomments");
const deletecomment = require("./Routes/deletecomment");
const last30 = require("./Routes/last30");
const thisweek = require("./Routes/thisweek");
const nextweek = require("./Routes/nextweek");
const bestoftheyear = require("./Routes/bestoftheyear");
const popular = require("./Routes/popularin2021");
const alltimetop = require("./Routes/alltimetop");
const platforms = require("./Routes/platforms");
const stores = require("./Routes/stores");
const genres = require("./Routes/genres");
const developers = require("./Routes/developers");
const listing = require("./Routes/listingplatform");

app.use(express.json());

app.use(cors());
app.use(homePage);
app.use(joinUs);
app.use(login);
app.use(gamedetails);
app.use(listing);
app.use(yourprofile);
app.use(favorite);
app.use(allfavorites);
app.use(deletefavorite);
app.use(wish);
app.use(wishlist);
app.use(deletewish);
app.use(commentary);
app.use(allcomments);
// app.use(deletecomment);
app.use(last30);
app.use(thisweek);
app.use(nextweek);
app.use(bestoftheyear);
app.use(popular);
app.use(alltimetop);
app.use(platforms);
app.use(stores);
app.use(genres);
app.use(developers);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Ooops , are you lost ?" });
});

app.listen(3000, () => {
  console.log("Server is now online /!\\");
});
