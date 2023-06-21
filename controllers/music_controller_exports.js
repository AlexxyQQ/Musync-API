const getAllSongs = require("../controllers/muisc_controller/get_all_songs");
const addAllSongs = require("../controllers/muisc_controller/add_all_songs");
const getAllFolderWithSongs = require("../controllers/muisc_controller/music_folder_controller");
const uploadAlbumArt = require("../controllers/muisc_controller/common/upload_album_art");
module.exports = {
  getAllSongs,
  addAllSongs,
  getAllFolderWithSongs,
  uploadAlbumArt,
};
