const express = require("express");
const musicController = require("../controllers/music_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");

const musicRouter = express.Router();

musicRouter
  .route("/uploadAlbumArt")
  .post(verifyUser, musicController.uploadAlbumArt);

//  All Songs
musicRouter.route("/addAllSongs").post(verifyUser, musicController.addAllSongs);

musicRouter.route("/getAllSongs").get(verifyUser, musicController.getAllSongs);

// All Folders
musicRouter
  .route("/getAllFolderWithSongs")
  .get(verifyUser, musicController.getAllFolderWithSongs);

musicRouter
  .route("/getAllFolders")
  .get(verifyUser, musicController.getAllFolders);
musicRouter
  .route("/getFolderSongs")
  .get(verifyUser, musicController.getFolderSongs);
musicRouter.route("/addFolders").post(verifyUser, musicController.addFolders);

// All Artists
musicRouter
  .route("/getAllArtistWithSongs")
  .get(verifyUser, musicController.getAllArtistWithSongs);

// All Albums
musicRouter.route("/addAlbums").post(verifyUser, musicController.addAlbums);
musicRouter
  .route("/getAllAlbums")
  .get(verifyUser, musicController.getAllAlbums);
musicRouter
  .route("/getAllAlbumWithSongs")
  .get(verifyUser, musicController.getAllAlbumWithSongs);

// All Playlist
musicRouter
  .route("/addToPlaylist")
  .post(verifyUser, musicController.addToPlaylist);
musicRouter
  .route("/createPlaylist")
  .get(verifyUser, musicController.createPlaylist);
musicRouter
  .route("/getPlaylists")
  .get(verifyUser, musicController.getPlaylists);

module.exports = musicRouter;
