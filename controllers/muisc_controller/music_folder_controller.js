const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Song = require("../../models/songModel");
const upload = multer({ dest: "uploads/" });

async function getAllFolderWithSongs(req, res, next) {}

module.exports = getAllFolderWithSongs;
