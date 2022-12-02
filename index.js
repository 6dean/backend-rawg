require("dotenv").config;

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/RAWG");

const homePage = require("./Routes/homepage");
const joinUs = require("./Routes/joinus");
const login = require("./Routes/login");
const favorite = require("./Routes/favorite");
const allfavorites = require("./Routes/allfavorites");
const deletefavorite = require("./Routes/deletefavorite");
const wish = require("./Routes/wish");
const wishlist = require("./Routes/wishlist");
const commentary = require("./Routes/commentary");
const allcomments = require("./Routes/allcomments");
const deletecomment = require("./Routes/deletecomment");

app.use(express.json());

app.use(cors());
app.use(homePage);
app.use(joinUs);
app.use(login);
app.use(favorite);
app.use(allfavorites);
// app.use(deletefavorite);
app.use(wish);
app.use(wishlist);
// app.use(commentary);
// app.use(allcomments);
// app.use(deletecomment);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Ooops , are you lost ?" });
});

app.listen(3000, () => {
  console.log("Server is now online /!\\");
});
