const mongoose = require("mongoose");

const lyricsSchema = new mongoose.Schema({
  timed: {
    type: Boolean,
    required: true,
  },
  timestamps: {
    type: String,
    required: false,
  },
  song: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
});

const lyricsModel = mongoose.model("Lyrics", lyricsSchema);

module.exports = lyricsModel;
