const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../../utils/error");
const signUp = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = bcrypt.hashSync(password, 10);
    const validUser = new User({
      username: username,
      email: email,
      password: hashPassword,
    });
    await validUser.save();
    res
      .status(200)
      .json({ message: "User Registered Successfully", user: validUser });
  } catch (error) {
    next(error);
  }
};

const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const validUser = await User.findOne({ email });
    if (!validUser) {
      next(errorHandler(404, "User not found"));
      return;
    }
    const isPasswordValid = bcrypt.compareSync(password, validUser.password);
    if (!isPasswordValid) {
      next(errorHandler(401, "Invalid Credentials"));
      return;
    }
    validUser.password = undefined;
    const token = jwt.sign({ validUser }, process.env.SECRET_KEY, {
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

const auth = async (req, res, next) => {
  const { email, displayName, photoUrl } = req.body;

  try {
    const validUser = await User.findOne({ email });

    if (validUser) {
      console.log("User found:", validUser);

      validUser.password = undefined;

      const token = jwt.sign({ validUser }, process.env.SECRET_KEY, {
        expiresIn: "20h",
      });
      console.log(token);
      res
        .cookie("access_token", token)
        .status(200)
        .json({ message: "User Logged In", user: validUser });
    } else {
      console.log("User not found, creating a new user");

      const userName = displayName.split(" ").join("").toLowerCase();
      const generatedPassword = bcrypt.hashSync(
        Math.random().toString(36).slice(-8),
        10
      );

      const validUser = new User({
        email,
        username: userName,
        profilePicture: photoUrl,
        password: generatedPassword,
      });

      await validUser.save();

      validUser.password = undefined;
      const token = jwt.sign({ validUser }, process.env.SECRET_KEY, {
        expiresIn: "20h",
      });

      res
        .cookie("access_token", token)
        .status(200)
        .json({ message: "User Registered", user: validUser });
    }
  } catch (error) {
    console.error("Error in auth controller:", error);
    next(error);
  }
};

const update = async (req, res, next) => {
  if (req.user._id != req.params._id)
    return next(errorHandler(404, "You can only update your account"));
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params._id },
      {
        $set: {
          username: req.body.username,
          profilePicture: req.body.profilePicture,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    updatedUser.password = undefined;
    return res.status(200).json({ user: updatedUser });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  if (req.user._id != req.params._id)
    return next(errorHandler(404, "You can only delete your account"));
  try {
    const isDeleted = await User.findOneAndDelete({ _id: req.params._id });
    if (isDeleted) next(errorHandler(200, "User Got Deleted"));
    else next(errorHandler(404, "User Not found"));
  } catch (error) {
    next(error);
  }
};
module.exports = { signUp, signIn, auth, update, deleteUser };
