const mongoose = require("mongoose");

const lyricsSchema = new mongoose.Schema({
  timed: {
    type: Boolean,
    required: true,
  },
  timestamps: {
    type: {
      type: String,
      enum: ["String"],
      default: "String",
    },
    required: true,
    default: {},
  },
  song: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
});

const Lyrics = mongoose.model("Lyrics", messageSchema);

module.exports = Lyrics;
