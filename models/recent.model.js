const mongoose = require("mongoose");

const folderSchema = new mongoose.Schema({
  date: {
    type: String,
    required: true,
  },
  expiring_date: {
    type: String,
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
