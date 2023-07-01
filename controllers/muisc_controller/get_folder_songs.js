const fs = require("fs");
const path = require("path");
const Song = require("../../models/songModel");

async function getFolderSongs(req, res, next) {
  try {
    // get user
    const user = res.locals.user;

    // get folder name
    const folderUrl = req.body.folderUrl;
    // check if folderUrl is valid
    if (!fs.existsSync(folderUrl)) {
      return res.status(400).json({
        success: false,
        message: "Folder does not exist",
      });
    }

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

    // get songs in the folderurl
    const folderSongs = songs.filter((song) => {
      const folder = path.dirname(song.serverUrl);
      console.log(folder, folderUrl);
      return folder === folderUrl;
    });

    return res.status(200).json({
      success: true,
      data: folderSongs,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: err.message,
    });
  }
}

module.exports = getFolderSongs;
