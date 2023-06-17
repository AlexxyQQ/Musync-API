const express = require("express");

const musicController = require("../controllers/musicController");
const { verifyUser } = require("../middlewares/verify_token");

const musicRouter = express.Router();

musicRouter.route("/addAllSongs").post(verifyUser, musicController.addSongs);
musicRouter.route("/getAllSongs").get(verifyUser, musicController.getAllSongs);
musicRouter
  .route("/getAllFolders")
  .get(verifyUser, musicController.getAllFolders);

module.exports = musicRouter;
