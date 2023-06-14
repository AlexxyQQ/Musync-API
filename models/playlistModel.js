const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  id: { type: String, required: true },
  playlist: { type: String, required: true },
  data: { type: String },
  dateAdded: { type: Number },
  numOfSongs: { type: Number, required: true },
  dateModified: { type: Number },
  playlistSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
  playlistUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const PlaylistModel = mongoose.model("Playlist", playlistSchema);

module.exports = PlaylistModel;
