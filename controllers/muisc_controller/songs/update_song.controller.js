const Songs = require("../../../models/song.model");

async function updateSong(req, res, next) {
  try {
    const { song_id, songMap } = req.body;

    if (!song_id) {
      return res.status(400).json({
        success: false,
        message: "Please provide a songId",
      });
    }

    if (!songMap) {
      return res.status(400).json({
        success: false,
        message: "Please provide a song.",
      });
    }

    // check if song exists
    const song = await Songs.find({ id: song_id });

    if (!song) {
      return res.status(404).json({
        success: false,
        message: "Song not found",
      });
    }

    // update song
    const updatedSong = await Songs.findOneAndUpdate(
      { id: song_id },
      { $set: songMap },
      { new: true } // returns the updated document
    );

    return res.status(200).json({
      success: true,
      message: "Song updated successfully",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message, // Use error.message to get the error message string
    });
  }
}

module.exports = updateSong;
