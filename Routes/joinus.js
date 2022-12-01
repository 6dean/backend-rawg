const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const BASE64 = require("crypto-js/enc-base64");

const Member = require("../Models/Member");

router.post("/joinus", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const emailExist = await Member.findOne({ email: email });
    if (!username) {
      return res.status(400).json({ message: "username needed" });
    }
    if (!email) {
      return res.status(400).json({ message: "email needed" });
    } else if (emailExist !== null) {
      return res.status(400).json({ message: "email already existing" });
    } else {
      const salt = uid2(16);
      const hash = SHA256(salt + password).toString(BASE64);
      const token = uid2(64);

      const newMember = new Member({
        email: email,
        username: username,
        token: token,
        hash: hash,
        salt: salt,
      });

      await newMember.save();

      const validMember = {
        id: newMember._id,
        token: token,
        email: email,
        username: username,
      };

      res.status(200).json(validMember);
    }
  } catch (error) {
    console.log(error);
    res.status(406).json({ message: error });
  }
});

module.exports = router;
