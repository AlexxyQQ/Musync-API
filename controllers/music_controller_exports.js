const getAllPublicSongs = require("../controllers/muisc_controller/get_all_public_songs");
const getUserPublicSongs = require("../controllers/muisc_controller/get_user_public_songs");
const getAllSongs = require("../controllers/muisc_controller/get_all_songs");
const addAllSongs = require("../controllers/muisc_controller/add_all_songs");
const getAllFolderWithSongs = require("./muisc_controller/get_all_folder_with_songs");
const getAllFolders = require("../controllers/muisc_controller/get_all_folders");
const uploadAlbumArt = require("../controllers/muisc_controller/common/upload_album_art");
const getFolderSongs = require("../controllers/muisc_controller/get_folder_songs");
const addFolders = require("../controllers/muisc_controller/add_folders");
const getAllArtistWithSongs = require("../controllers/muisc_controller/get_all_artist_with_songs");
const addAlbums = require("../controllers/muisc_controller/add_albums");
const getAllAlbums = require("../controllers/muisc_controller/get_all_albums");
const getAllAlbumWithSongs = require("../controllers/muisc_controller/get_all_album_with_songs");
const addToPlaylist = require("../controllers/muisc_controller/add_to_playlist");
const createPlaylist = require("../controllers/muisc_controller/create_playlist");
const getPlaylists = require("../controllers/muisc_controller/get_playlists");
const togglePublic = require("../controllers/muisc_controller/toggle_public");
const deleteSong = require("../controllers/muisc_controller/delete_song");

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
};
