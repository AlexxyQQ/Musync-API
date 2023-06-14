const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema({
  id: { type: String, required: true },
  album: { type: String, required: true },
  artist: { type: String },
  artistId: { type: String },
  numOfSongs: { type: Number, required: true },
  albumSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
});

const AlbumModel = mongoose.model("Album", albumSchema);

module.exports = AlbumModel;
