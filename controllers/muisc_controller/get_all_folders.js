const Song = require("../../models/songModel");
const fs = require("fs");
const path = require("path");

async function getAllFolders(req, res, next) {
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

    // Separate the songs into folders
    const folders = [];
    songs.forEach((song) => {
      const folder = path.dirname(song.serverUrl);
      if (!folders.includes(folder)) {
        folders.push(folder);
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

module.exports = getAllFolders;
