require("dotenv").config;

const express = require("express");
const app = express();
const cors = require("cors");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/RAWG");

const homePage = require("./Routes/homepage");
const joinUs = require("./Routes/joinus");

app.use(express.json());

app.use(cors());
app.use(homePage);
app.use(joinUs);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Ooops , are you lost ?" });
});

app.listen(3000, () => {
  console.log("Server is now online /!\\");
});
