const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const errorHandler = require("../../utils/error");
const signUp = async (req, res, next) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await newUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", user: newUser });
  } catch (error) {
    next(error);
  }
};

module.exports = { signUp };
