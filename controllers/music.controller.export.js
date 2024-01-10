//Songs
const addSong = require("./muisc_controller/songs/add_song.controller");
const addSongs = require("./muisc_controller/songs/add_songs.controller");
const getAllSongs = require("./muisc_controller/songs/get_all_songs.controller");
const deleteSong = require("./muisc_controller/songs/delete_song.controller");
const updateSong = require("./muisc_controller/songs/update_song.controller");
//lyrics
const getLyrics = require("./muisc_controller/lyrics/get_lyrics.controller");
// Albums
const addAlbums = require("./muisc_controller/albums/add_albums.controller");
const getAllAlbums = require("./muisc_controller/albums/get_all_albums.controller");
const deleteAlbum = require("./muisc_controller/albums/delete_album.controller");
// Artists
const getAllArtists = require("./muisc_controller/artists/get_all_artists.controller");
module.exports = {
  // Songs
  addSong,
  addSongs,
  getAllSongs,
  deleteSong,
  updateSong,
  //lyrics
  getLyrics,
  // Albums
  addAlbums,
  getAllAlbums,
  deleteAlbum,
  // Artists
  getAllArtists,
};
