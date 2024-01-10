const ArtistModel = require("../../../models/artist.model");

async function getAllArtists(req, res, next) {
  try {
    const artists = await ArtistModel.find().populate("songs");

    return res.status(200).json({
      success: true,
      message: "Successfully retrieved all artists",
      artists: artists,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve all artists",
      error: error.message,
    });
  }
}

module.exports = getAllArtists;
