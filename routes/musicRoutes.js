const express = require("express");

const musicController = require("../controllers/musicController");
const { verifyUser } = require("../middlewares/verify_token");

const musicRouter = express.Router();

musicRouter.route("/upload").post(verifyUser, musicController.uploadFile);
musicRouter.route("/files").get(verifyUser, musicController.files);

module.exports = musicRouter;
