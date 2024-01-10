const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
  },
  folder_name: {
    type: String,
    required: true,
  },
  number_of_songs: {
    type: Number,
    required: true,
  },
  songs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
});

const folderModel = mongoose.model("Folders", folderSchema);

module.exports = folderModel;
