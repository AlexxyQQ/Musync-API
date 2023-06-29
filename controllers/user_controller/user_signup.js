const User = require("../../models/userModel");
const bcryptjs = require("bcryptjs");

async function signup(req, res) {
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
      res.status(200).json({
        success: true,
        data: user,
        message: "User created successfully!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = signup;
