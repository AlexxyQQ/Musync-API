const express = require("express");

const musicController = require("../controllers/musicController");
const { verifyUser } = require("../middlewares/verify_token");

const musicRouter = express.Router();

musicRouter.route("/uploadSongs").post(verifyUser, musicController.uploadSongs);
musicRouter.route("/getSongs").get(verifyUser, musicController.getSongs);

module.exports = musicRouter;
