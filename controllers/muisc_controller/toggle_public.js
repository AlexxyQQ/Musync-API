const Song = require("../../models/song.model");

async function makePublic(req, res, next) {
  try {
    // Get the id of the song from the request body
    const songId = req.body.songId;
    const toggleValue = req.body.toggleValue;

    // Find the song in the database
    const song = await Song.findOne({ id: songId });

    // Check if the song exists
    if (!song) {
      return res.status(400).json({
        success: false,
        message: "Song does not exist",
      });
    } else {
      // Change the song's public status to true
      song.isPublic = toggleValue;
      // Save the song
      await song.save();
      // Return a success message
      return res.status(200).json({
        success: true,
        message: `Song is now ${toggleValue == true ? "public" : "private"}`,
      });
    }
  } catch (error) {
    // Handle any errors that occurred during the process
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while making the song public",
    });
  }
}

module.exports = makePublic;
