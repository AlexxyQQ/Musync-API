const fs = require("fs");
const Song = require("../../models/songModel");

async function getAllAlbums(req, res, next) {
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
        song.remove();
      }
    });

    // get all albums
    // if album is not available then make it as unknown

    const albums = [];
    songs.forEach((song) => {
      if (song.album === "") {
        song.album = "Unknown";
      }
      if (!albums.includes(song.album)) {
        albums.push(song.album);
      }
    });

    res.status(200).json({
      success: true,
      data: albums,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getAllAlbums;
