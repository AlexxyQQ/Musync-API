const fs = require("fs");
const multer = require("multer");
const Song = require("../../models/songModel");
const { findMP3Files } = require("./common/find_song");

async function getAllSongs(req, res, next) {
  try {
    const user_data = res.locals.user;
    const folderPath = `./uploads/${user_data.username}`;

    if (fs.existsSync(folderPath)) {
      const gotFiles = await findMP3Files(folderPath);

      const allFiles = [];

      for (const file of gotFiles) {
        const songExists = await Song.findOne({ serverUrl: file.serverUrl });

        if (songExists) {
          allFiles.push(songExists);
        } else {
          // Delete the file from the system
          if (fs.existsSync(file.serverUrl)) {
            console.log("Deleting file: " + file.serverUrl);
            fs.unlinkSync(file.serverUrl);
          }
          await Song.deleteOne({ serverUrl: file.serverUrl });
        }
      }

      return res.status(200).json({
        success: true,
        data: allFiles,
        message: `Fetched all files of ${user_data.username}`,
      });
    } else {
      return res.status(200).json({
        success: true,
        data: [],
        message: `No files found for ${user_data.username}`,
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve file data",
      data: {},
    });
  }
}

module.exports = getAllSongs;
