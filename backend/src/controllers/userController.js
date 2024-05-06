const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const signUp = async (req, res) => {
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
    res.status(500).json(error.message);
  }
};

module.exports = { signUp };
