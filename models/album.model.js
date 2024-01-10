const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  album: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },
  artist_id: {
    type: String,
  },
  num_of_songs: {
    type: Number,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
});

const albumModel = mongoose.model("Albums", albumSchema);

module.exports = albumModel;
