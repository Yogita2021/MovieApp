const express = require("express");
require("dotenv").config();
const { User } = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const userRouter = express.Router();

userRouter.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      res.status(201).json({ msg: "User already exist !" });
    } else {
      const hashPassword = bcrypt.hashSync(password, 8);
      const newUser = new User({ name, email, password: hashPassword });
      await newUser.save();
      res.status(200).json({ msg: "New user registered !", user: newUser });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      res.status(201).json({ msg: "Please login First!" });
    }
    let passCheck = bcrypt.compareSync(password, user.password);
    if (!passCheck) {
      res.status(201).json({ msg: "wrong credential" });
      return;
    }
    let payload = { userName: user.name, userID: user._id };
    const token = jwt.sign(payload, process.env.Secrete_key, {
      expiresIn: "8h",
    });
    res
      .status(200)
      .send({ msg: "Login successful !", token: token, user: user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = { userRouter };
