const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) next(errorHandler(404, "User not found"));
    const isPasswordValid = bcrypt.compareSync(password, validUser.password);
    if (!isPasswordValid) next(errorHandler(401, "Invalid Credentials"));
    validUser.password = undefined;
    console.log(validUser);
    const token = jwt.sign({ validUser }, "secret_keyToken", {
      expiresIn: "20h",
    });
    res
      .cookie("access_token", token)
      .status(200)
      .json({ message: "User Logged In", user: validUser });
  } catch (error) {
    next(error);
  }
};
module.exports = { signUp, signIn };
