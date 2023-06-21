const express = require("express");
const musicController = require("../controllers/music_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");

const musicRouter = express.Router();

musicRouter
  .route("/uploadAlbumArt")
  .post(verifyUser, musicController.uploadAlbumArt);
musicRouter.route("/addAllSongs").post(verifyUser, musicController.addAllSongs);
musicRouter.route("/getAllSongs").get(verifyUser, musicController.getAllSongs);

musicRouter
  .route("/getAllFolderWithSongs")
  .get(verifyUser, musicController.getAllFolderWithSongs);

module.exports = musicRouter;
