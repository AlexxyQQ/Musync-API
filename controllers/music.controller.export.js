const getAllPublicSongs = require("./muisc_controller/get_all_public_songs");
const getUserPublicSongs = require("./muisc_controller/get_user_public_songs");
const getAllSongs = require("./muisc_controller/get_all_songs");
const addAllSongs = require("./muisc_controller/add_all_songs");
const getAllFolderWithSongs = require("./muisc_controller/get_all_folder_with_songs");
const getAllFolders = require("./muisc_controller/get_all_folders");
const uploadAlbumArt = require("./muisc_controller/common/upload_album_art");
const getFolderSongs = require("./muisc_controller/get_folder_songs");
const addFolders = require("./muisc_controller/add_folders");
const getAllArtistWithSongs = require("./muisc_controller/get_all_artist_with_songs");
const addAlbums = require("./muisc_controller/add_albums");
const getAllAlbums = require("./muisc_controller/get_all_albums");
const getAllAlbumWithSongs = require("./muisc_controller/get_all_album_with_songs");
const addToPlaylist = require("./muisc_controller/add_to_playlist");
const createPlaylist = require("./muisc_controller/create_playlist");
const getPlaylists = require("./muisc_controller/get_playlists");
const togglePublic = require("./muisc_controller/toggle_public");
const deleteSong = require("./muisc_controller/delete_song");
const getLyric = require("./muisc_controller/get_lyric");

module.exports = {
  uploadAlbumArt,
  getAllSongs,
  getAllPublicSongs,
  addAllSongs,
  getAllFolderWithSongs,
  getAllFolders,
  getFolderSongs,
  addFolders,
  getAllArtistWithSongs,
  addAlbums,
  getAllAlbums,
  getAllAlbumWithSongs,
  addToPlaylist,
  createPlaylist,
  getPlaylists,
  togglePublic,
  deleteSong,
  getUserPublicSongs,
  getLyric,
};
