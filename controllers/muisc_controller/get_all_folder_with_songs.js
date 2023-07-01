const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Song = require("../../models/songModel");
const upload = multer({ dest: "public/uploads/" });

async function getAllFolderWithSongs(req, res, next) {
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

    // Separate the songs into folders as kry and songs as value
    const folders = {};
    songs.forEach((song) => {
      const folder = path.dirname(song.serverUrl);
      if (folders[folder]) {
        folders[folder].push(song);
      } else {
        folders[folder] = [song];
      }
    });

    res.status(200).json({
      success: true,
      data: folders,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = getAllFolderWithSongs;
