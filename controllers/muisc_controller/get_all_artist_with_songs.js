const Song = require("../../models/songModel");
const fs = require("fs");

async function getAllArtistWithSongs(req, res, next) {
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

    // get all artists as key as their songs as value (make artist name as key and songs as value)
    const artistWithSongs = {};
    songs.forEach((song) => {
      const artist = song.artist;
      if (artistWithSongs[artist]) {
        artistWithSongs[artist].push(song);
      } else {
        artistWithSongs[artist] = [song];
      }
    });

    res.status(200).json({
      success: true,
      data: artistWithSongs,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = getAllArtistWithSongs;
