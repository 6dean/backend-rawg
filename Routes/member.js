const express = require("express");
const router = express.Router();
const uid2 = require("uid2");
const SHA256 = require("crypto-js/sha256");
const BASE64 = require("crypto-js/enc-base64");
const encBase64 = require("crypto-js/enc-base64");

const Member = require("../Models/Member");

//
// CREATE AN ACCOUNT
//

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

//
// CREATE AN ACCOUNT
//

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const User = await Member.findOne({ email: email });

    if (User) {
      const salt = User.salt;
      const newHash = SHA256(salt + password).toString(encBase64);

      if (email === User.email) {
        const validLogin = {
          id: User._id,
          token: User.token,
          username: User.username,
        };
        return res.status(200).json(validLogin);
      } else if (newHash !== User.hash || email !== User.email) {
        res
          .status(406)
          .json({ message: "Email or Password invalid. Please retry !" });
      }
    } else {
      res
        .status(406)
        .json({ message: "Email or Password invalid. Please retry !" });
    }
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//
// GET INFO ACCOUNT (Your Page -- frontend)
//

router.put("/profile", async (req, res) => {
  const { token } = req.body;
  try {
    const User = await Member.findOne({
      token: token,
    });
    const UserInfos = {
      Username: User.username,
      Email: User.email,
      Favorites: User.favorites,
      Wishlist: User.wishlist,
      Reviews: User.comments,
    };
    res.status(200).json(UserInfos);
  } catch (error) {
    console.log(error + " " + "MUHAHAHA");
    res.status(406).json({ message: error });
  }
});

module.exports = router;
