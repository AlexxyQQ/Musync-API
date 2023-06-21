const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Song = require("../../models/songModel");
const upload = multer({ dest: "uploads/" });

function addAllSongs(req, res, next) {
  const user_data = res.locals.user;
  upload.single("files")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    }

    try {
      const { mainFolder, subFolder, songModelMap } = req.body;
      console.log(songModelMap);
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          success: false,
          message: "Please choose a file",
        });
      }
      if (!mainFolder) {
        return res.status(400).json({
          success: false,
          message: "Please choose the main folder",
        });
      }
      if (!subFolder) {
        return res.status(400).json({
          success: false,
          message: "Please choose the sub folder",
        });
      }

      const folderPath = `uploads`;
      var uploadPathTemp = path.join(
        folderPath,
        user_data["username"],
        mainFolder
      );

      const subFolderPathSplit = subFolder.split("/");
      const endIndex = subFolderPathSplit.length - 2; // Get the second last index

      const subFoldersToAdd = subFolderPathSplit.slice(4, endIndex + 1);
      const additionalPath = subFoldersToAdd.join("/");

      const uploadPath = path.join(uploadPathTemp, additionalPath);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const filePath = path.join(
        uploadPath,
        subFolderPathSplit[subFolderPathSplit.length - 1]
      );

      const existingFile = await Song.findOne({ serverUrl: filePath });

      // If the file is not in the database, save it and add to the system
      if (!existingFile) {
        await fs.promises.writeFile(
          filePath,
          await fs.promises.readFile(file.path)
        );
        fs.unlinkSync(file.path);
        let songModel = new Song({
          id: songModelMap.id,
          serverUrl: filePath.replace(/\\/g, "/"),
          album: songModelMap.album,
          albumId: songModelMap.albumId,
          artist: songModelMap.albumId,
          artistId: songModelMap.albumId,
          bookmark: songModelMap.bookmark,
          composer: songModelMap.composer,
          data: songModelMap.data,
          dateAdded: songModelMap.dateAdded,
          dateModified: songModelMap.dateModified,
          displayName: songModelMap.displayName,
          displayNameWOExt: songModelMap.displayNameWOExt,
          duration: songModelMap.duration,
          fileExtension: songModelMap.fileExtension,
          genre: songModelMap.genre,
          genreId: songModelMap.genreId,
          isAlarm: songModelMap.isAlarm,
          isAudioBook: songModelMap.isAudioBook,
          isMusic: songModelMap.isMusics,
          isNotification: songModelMap.isNotification,
          isPodcast: songModelMap.isPodcast,
          isRingtone: songModelMap.isRingtone,
          size: songModelMap.size,
          title: songModelMap.title,
          track: songModelMap.track,
          uri: songModelMap.uri,
          albumArt: songModelMap.albumArt,
          albumArtUrl: filePath.replace("mp3", "png"),
        });

        try {
          songModel = await songModel.save();
          // save the album art in the system using multer
        } catch (error) {
          // Handle duplicate song ID error
          console.error(error);
          fs.unlinkSync(filePath); // Delete the newly created file
          next();
        }
      } else {
        // If the file is in the database but not in the system, add it to the system
        if (!fs.existsSync(filePath)) {
          await fs.promises.writeFile(
            filePath,
            await fs.promises.readFile(file.path)
          );
        }
        fs.unlinkSync(file.path); // Delete the uploaded file
      }

      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      return res.status(400).json({
        success: false,
        message: "File upload failed",
      });
    }
  });
}

module.exports = addAllSongs;
