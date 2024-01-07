const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  id: { type: String, required: true },
  playlist: { type: String, required: true },
  data: { type: String },
  date_added: { type: Number },
  num_of_songs: { type: Number, required: true },
  date_modified: { type: Number },
  playlist_songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
  playlist_user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const playlistModel = mongoose.model("Playlist", playlistSchema);

module.exports = playlistModel;
