const User = require("../../models/userModel");
const Songs = require("../../models/songModel");

async function deleteUser(req, res) {
  try {
    const localUser = res.locals.user;

    const dbUser = await User.findById(localUser.id);
    if (!dbUser) {
      return res.status(400).json({
        success: false,
        message: "User does not exist!",
      });
    }

    // delete all songs uploaded by user
    await Songs.deleteMany({
      serverUrl: { $regex: localUser.username },
    });

    await User.findByIdAndDelete(localUser.id);

    res.status(200).json({ message: "Profile deleted successfully" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = deleteUser;
