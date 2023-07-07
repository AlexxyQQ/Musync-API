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
        song.deleteOne();
      }
    });

    // get all albums
    // if album is not available then make it as unknown
    //  albums.push({
    //   id: song.albumId,
    //   album: song.album,
    //   artist: song.artist,
    //   artistId: song.artistId,
    //   numOfSongs: numOfSongs,
    // });

    const albums = [];
    songs.forEach((song) => {
      let album = albums.find((album) => album.id === song.albumId);
      if (!album) {
        albums.push({
          id: song.albumId,
          album: song.album,
          artist: song.artist,
          artistId: song.artistId,
          numOfSongs: 1,
        });
      } else {
        album.numOfSongs += 1;
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
