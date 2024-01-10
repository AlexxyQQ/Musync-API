const mongoose = require("mongoose");

const artistSchema = new mongoose.Schema({
  id: {
    type: Number,
  },
  artist: {
    type: String,
    required: true,
  },
  number_of_albums: {
    type: Number,
  },
  number_of_tracks: {
    type: Number,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
});

const artistModel = mongoose.model("Artists", artistSchema);

module.exports = artistModel;
