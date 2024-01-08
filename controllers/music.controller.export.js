//Songs
const addSong = require("./muisc_controller/songs/add_song.controller");
const addSongs = require("./muisc_controller/songs/add_songs.controller");
const getAllSongs = require("./muisc_controller/songs/get_all_songs.controller");
const deleteSong = require("./muisc_controller/songs/delete_song.controller");
const updateSong = require("./muisc_controller/songs/update_song.controller");
//lyrics
const getLyrics = require("./muisc_controller/lyrics/get_lyrics.controller");
module.exports = {
  // Songs
  addSong,
  addSongs,
  getAllSongs,
  deleteSong,
  updateSong,
  //lyrics
  getLyrics,
};
