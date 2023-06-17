const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const verifyUser = require("../middlewares/verify_token");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, type } = req.body;
    let errorMessage = "";

    if (!username || !email || !password || !confirmPassword) {
      errorMessage = "Please provide ";
      if (!username) errorMessage += "Username, ";
      if (!email) errorMessage += "Email, ";
      if (!password) errorMessage += "Password, ";
      if (!confirmPassword) errorMessage += "Confirm Password, ";
      errorMessage = errorMessage.slice(0, -2) + "!";
    }

    const existingUserEmail = await User.findOne({ email });
    const existingUsername = await User.findOne({ username });

    if (existingUsername) {
      errorMessage = "User with same USERNAME already exists!";
    } else if (existingUserEmail) {
      errorMessage = "User with same EMAIL already exists!";
    } else if (password !== confirmPassword) {
      errorMessage = "Passwords do not match!";
    }

    if (errorMessage) {
      console.log(errorMessage);

      return res.status(400).json({ success: false, message: errorMessage });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    if (req.body.profilePic) {
      let user = new User({
        username,
        email,
        password: hashedPassword,
        type,
        profilePic: req.body.profilePic,
      });
      user = await user.save();
      console.log(user);
      res.status(200).json({
        success: true,
        data: user,
        message: "User created successfully!",
      });
    } else {
      let user = new User({
        username,
        email,
        password: hashedPassword,
        type,
      });
      user = await user.save();
      console.log(user);
      res.status(200).json({
        success: true,
        data: user,
        message: "User created successfully!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: !email ? "Please provide email!" : "Please provide password!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User with this email does not exist!",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Incorrect Password." });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        type: user.type,
        profilePic: user.profilePic,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRES_IN,
      }
    );

    console.log("User logged in successfully!");
    res.status(200).json({
      success: true,
      data: { user, token },
      message: "User logged in successfully!",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.loginWithToken = async (req, res) => {
  try {
    const user = await User.findOne({ email: res.locals.user["email"] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    } else {
      res.json({
        success: true,
        data: {
          user,
          token: res.locals.token,
        },
        message: "User logged in successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};
