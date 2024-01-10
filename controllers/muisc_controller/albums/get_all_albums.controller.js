const AlbumModel = require("../../../models/album.model");

async function getAllAlbums(req, res, next) {
  try {
    const albums = await AlbumModel.find().populate("songs");

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all albums",
      albums: albums,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve all albums",
      error: error.message,
    });
  }
}

module.exports = getAllAlbums;
