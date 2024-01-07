const Songs = require("../../../models/song.model");

async function deleteSong(req, res, next) {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a songId",
      });
    }
    // check if song exists
    const song = await Songs.findById(songId);

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    await Songs.findByIdAndDelete(songId);

    return res.status(200).json({
      success: true,
      message: "Successfully deleted song",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message, // Use error.message to get the error message string
    });
  }
}

module.exports = deleteSong;
