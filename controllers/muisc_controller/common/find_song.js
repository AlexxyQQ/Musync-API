const fs = require("fs");
const path = require("path");
const Song = require("../../../models/songModel");

async function findMP3Files(directoryPath) {
  const mp3Files = [];

  async function traverseDirectory(dir) {
    // check if the directory exists
    if (fs.existsSync(dir)) {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const fileStat = fs.statSync(filePath);

        if (fileStat.isDirectory()) {
          await traverseDirectory(filePath); // Recursively traverse subdirectories
        } else if (path.extname(filePath).toLowerCase() === ".mp3") {
          var song = await Song.findOne({
            serverUrl: filePath.replace(/\\/g, "/"),
          });

          // Check if the song exists in the system and the database
          if (song !== null && fs.existsSync(filePath)) {
            mp3Files.push(song);
          } else {
            // Delete the all file from the system
            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }
          }
        }
      }
      // delete all the file in the database that are not in the system
      const allSongs = await Song.find({});
      for (const song of allSongs) {
        if (!fs.existsSync(song.serverUrl)) {
          await Song.deleteOne({ serverUrl: song.serverUrl });
        }
      }
    } else {
      return mp3Files;
    }
  }

  await traverseDirectory(directoryPath);
  // save it in a json file

  return mp3Files;
}

exports.findMP3Files = findMP3Files;
