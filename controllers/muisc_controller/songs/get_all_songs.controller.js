const Song = require("../../../models/song.model");

async function getAllSongs(req, res, next) {
  try {
    const songs = await Song.find().populate("lyrics", "timestamps").lean();

    // for songs with lyrics, update the lyrics to be only the timestamps
    const modifiedSongs = songs.map((song) => {
      if (song.lyrics) {
        return { ...song, lyrics: song.lyrics.timestamps };
      }
      return song;
    });

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all songs",
      songs: modifiedSongs,
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
