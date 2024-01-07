const fs = require("fs");
const Song = require("../../models/song.model");

async function getAllAlbumWithSongs(req, res, next) {
  try {
    // get user
    const user = res.locals.user;

    // find songs containing username in the serverurl
    const songs = await Song.find({
      serverUrl: { $regex: user.username },
    });

    // check if the songs are in the server
    songs.forEach((song) => {
      if (!fs.existsSync(song.serverUrl)) {
        song.deleteOne();
      }
    });

    // get all albums as key as their songs as value (make album name as key and songs as value)
    // if album is not available then make it as unknown
    // make sure the album contains the same artist
    const albumWithSongs = songs.reduce((acc, song) => {
      if (song.album === "") {
        song.album = "Unknown";
      }
      if (acc[song.album]) {
        acc[song.album].push(song);
      } else {
        acc[song.album] = [song];
      }
      return acc;
    }, {});

    res.status(200).json({
      success: true,
      data: albumWithSongs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getAllAlbumWithSongs;
