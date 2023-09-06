const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  serverUrl: { type: String, required: true, unique: true },
  data: { type: String },
  uri: { type: String },
  displayName: { type: String },
  displayNameWOExt: { type: String },
  size: { type: Number },
  album: { type: String },
  albumId: { type: String },
  artist: { type: String },
  artistId: { type: String },
  genre: { type: String },
  genreId: { type: String },
  bookmark: { type: Number },
  composer: { type: String },
  dateAdded: { type: Number },
  dateModified: { type: Number },
  duration: { type: Number },
  title: { type: String },
  track: { type: Number },
  fileExtension: { type: String },
  isAlarm: { type: Boolean },
  isAudioBook: { type: Boolean },
  isMusic: { type: Boolean },
  isNotification: { type: Boolean },
  isPodcast: { type: Boolean },
  isRingtone: { type: Boolean },
  albumArt: { type: String },
  albumArtUrl: { type: String },
  isPublic: { type: Boolean, default: false },
  lyrics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lyrics",
  },
});

const song = mongoose.model("Songs", songSchema);

module.exports = song;
