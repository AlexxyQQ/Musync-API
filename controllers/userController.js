const User = require("../models/userModel");
const bcryptjs = require("bcryptjs");

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
      return res.status(400).json({ status: "fail", error: errorMessage });
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
      return res.status(400).json({ error: errorMessage });
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
    res.json({ data: user });
  } catch (err) {
    console.log(err);
    res.status(400).json({ status: "fail", error: err.message });
  }
};
