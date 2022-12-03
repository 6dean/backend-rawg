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
    const UsernameExist = await Member.findOne({ username: username });
    if (!username && email) {
      return res
        .status(400)
        .json({ message: "Username and email are needed !" });
    } else if (emailExist) {
      return res
        .status(406)
        .send({ message: "This email has already an account !" });
    } else if (UsernameExist) {
      return res
        .status(406)
        .send({ message: "This Username is already used !" });
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
