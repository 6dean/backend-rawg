require("dotenv").config;

const express = require("express");
const app = express();
const cors = require("cors");

const homePage = require("./Routes/homepage");

app.use(cors());
app.use(homePage);

app.all("*", (req, res) => {
  res.status(404).json({ message: "Ooops , are you lost ?" });
});

app.listen(3000, () => {
  console.log("Server is now online /!\\");
});
