const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  path: { type: String, required: true },
  numOfSongs: { type: Number, required: true },
  folderSongs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Songs",
    },
  ],
  folderUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
});

const FolderModel = mongoose.model("Folder", folderSchema);

module.exports = FolderModel;
