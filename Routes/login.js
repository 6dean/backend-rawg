const express = require("express");
const router = express.Router();
const SHA256 = require("crypto-js/sha256");
const encBase64 = require("crypto-js/enc-base64");

const Member = require("../Models/Member");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await Member.findOne({ email: email });
    const salt = User.salt;
    const newHash = SHA256(salt + password).toString(encBase64);

    console.log(User.hash);

    if (email === User.email) {
      const validLogin = {
        id: User._id,
        token: User.token,
        username: User.username,
      };
      return res.status(200).json(validLogin);
    } else if (newHash !== User.hash || email !== User.email) {
      res.status(400).json({ message: "email or password invalid" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

module.exports = router;
