const AlbumModel = require("../../../models/album.model");

async function deleteAlbum(req, res, next) {
  try {
    const { album_id } = req.body;

    if (!album_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a album id",
      });
    }
    // check if song exists
    const album = await AlbumModel.find({
      id: album_id,
    });

    if (!album) {
      return res.status(404).json({
        success: false,
        message: "Album not found",
      });
    }

    await AlbumModel.findOneAndDelete({
      id: album_id,
    });

    return res.status(200).json({
      success: true,
      message: "Successfully deleted album",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message, // Use error.message to get the error message string
    });
  }
}

module.exports = deleteAlbum;
