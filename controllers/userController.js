const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password, confirmPassword, type, profilePic } =
      req.body;
    let errorMessage = "";

    if (!username || !email || !password || !confirmPassword) {
      errorMessage = "Please provide ";
      if (!username) errorMessage += "Username, ";
      if (!email) errorMessage += "Email, ";
      if (!password) errorMessage += "Password, ";
      if (!confirmPassword) errorMessage += "Confirm Password, ";
      errorMessage = errorMessage.slice(0, -2) + "!";
    }

    if (errorMessage) {
      return res.status(400).json({ stauts: false, message: errorMessage });
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
      return res.status(400).json({ stauts: false, message: errorMessage });
    }

    const hashedPassword = await bcryptjs.hash(password, 12);
    let user = new User({
      username,
      email,
      password: hashedPassword,
      type,
      profilePic,
    });

    user = await user.save();
    console.log(user);
    res.json({
      success: true,
      data: user,
      message: "User created successfully!",
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: false, message: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: false,
        message: !email ? "Please provide email!" : "Please provide password!",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        status: false,
        messag: "User with this email does not exist!",
      });
    }

    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ status: false, messag: "Incorrect Password." });
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
      status: true,
      data: { user, token },
      message: "User logged in successfully!",
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message,
    });
  }
};
