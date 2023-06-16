const fs = require("fs");
const multer = require("multer");
const path = require("path");
const Song = require("../models/songModel");
const upload = multer({ dest: "uploads/" });
const folderPath = "uploads";

exports.uploadSongs = (req, res, next) => {
  const user_data = res.locals.user;
  upload.single("files")(req, res, async (err) => {
    if (err) {
      console.error(err);
      err.httpStatusCode = 400;
      return next(err);
    }

    try {
      const { mainFolder, subFolder, songModelMap } = req.body;
      console.log(songModelMap);
      const file = req.file;

      if (!file) {
        throw new Error("Please choose a file");
      }
      if (!mainFolder) {
        throw new Error("Please choose the main folder");
      }
      if (!subFolder) {
        throw new Error("Please choose the sub folder");
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
      removeFilesInDirectory(uploadPath);

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }

      const filePath = path.join(
        uploadPath,
        subFolderPathSplit[subFolderPathSplit.length - 1]
      );

      const existingFile = await Song.findOne({ serverUrl: filePath });
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
        });
        songModel = await songModel.save();
      } else {
        fs.unlinkSync(file.path); // Delete the uploaded file if it already exists
      }
      removeFilesInDirectory("./uploads");
      return res.status(200).json({
        success: true,
        message: "File uploaded successfully",
      });
    } catch (error) {
      console.error(error);
      error.httpStatusCode = 400;
      return next(error);
    }
  });
};

function removeFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  files.forEach((file) => {
    const filePath = path.join(directoryPath, file);
    const fileStat = fs.statSync(filePath);

    if (fileStat.isFile()) {
      fs.unlinkSync(filePath);
      console.log(`Deleted file: ${filePath}`);
    }
  });
}

async function findMP3Files(directoryPath) {
  const mp3Files = [];

  async function traverseDirectory(dir) {
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
        mp3Files.push(song);
      }
    }
  }

  await traverseDirectory(directoryPath);
  return mp3Files;
}

exports.getSongs = async (req, res, next) => {
  try {
    const user_data = res.locals.user;
    const folderPath = `./uploads`;
    const fileData = [];

    // const allFiles = await readFilesRecursive(folderPath, fileData); // Call recursive function and get the updated file data
    const allFiles = await findMP3Files(folderPath); // Call recursive function and get the updated file data
    console.log(allFiles);

    return res.status(200).json({
      success: true,
      data: allFiles,
      message: `Fetched all files of ${user_data["username"]}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Failed to retrieve file data",
      data: {},
    });
  }
};
