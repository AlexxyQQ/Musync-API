const mongoose = require("mongoose");

const songSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  data: { type: String },
  uri: { type: String },
  display_name: { type: String },
  display_name_wo_ext: { type: String },
  size: { type: Number },
  album: { type: String },
  album_id: { type: String },
  artist: { type: String },
  artist_id: { type: String },
  genre: { type: String },
  genre_id: { type: String },
  bookmark: { type: Number },
  composer: { type: String },
  date_added: { type: Number },
  date_modified: { type: Number },
  duration: { type: Number },
  title: { type: String },
  track: { type: Number },
  file_extension: { type: String },
  is_alarm: { type: Boolean },
  is_audio_book: { type: Boolean },
  is_music: { type: Boolean },
  is_notification: { type: Boolean },
  is_podcast: { type: Boolean },
  is_ringtone: { type: Boolean },
  album_art: { type: String },
  is_favourite: { type: Boolean, default: false },
  lyrics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lyrics",
  },
});

const songModel = mongoose.model("Songs", songSchema);

module.exports = songModel;
