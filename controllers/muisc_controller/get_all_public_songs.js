const Song = require("../../models/songModel");

async function getAllPublicSongs(req, res, next) {
  try {
    const allPublicSongs = await Song.find({ isPublic: true });
    // remove the duplicate songs
    const uniqueSongs = allPublicSongs.filter(
      (song, index, self) =>
        index ===
        self.findIndex(
          (s) => s.songName === song.songName && s.artist === song.artist
        )
    );

    return res.status(200).json({
      success: true,
      data: uniqueSongs,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve file data",
      data: {},
    });
  }
}

module.exports = getAllPublicSongs;
