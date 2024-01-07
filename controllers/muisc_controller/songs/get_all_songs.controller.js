const Song = require("../../../models/song.model");

async function getAllSongs(req, res, next) {
  try {
    const songs = await Song.find().populate("lyrics");

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all songs",
      songs: songs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve all songs",
      error: error.message,
    });
  }
}

module.exports = getAllSongs;
