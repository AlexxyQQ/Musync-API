const Songs = require("../../models/song.model");

async function deleteSong(req, res, next) {
  try {
    const { songId } = req.body;

    if (!songId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a songId",
      });
    }
    // Check if the song exists in the database
    const existingSong = await Songs.findOne({ id: songId });
    if (!existingSong) {
      return res.status(200).json({
        success: true,
        message: "Song not found in database",
      });
    }

    // Delete the song with the given songId
    await Songs.findOneAndDelete({
      id: songId,
    });

    return res.status(200).json({
      success: true,
      message: "Song deleted successfully",
      newSong: await Songs.find({}),
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message, // Use error.message to get the error message string
    });
  }
}

module.exports = deleteSong;
