const Song = require("../../models/song.model");

async function getUserPublicSongs(req, res, next) {
  try {
    console.log(res.locals.user);
    const allPublicSongs = await Song.find({
      isPublic: true,
      serverUrl: { $regex: res.locals.user.username },
    });
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
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve file data",
      data: {},
    });
  }
}

module.exports = getUserPublicSongs;
