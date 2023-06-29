const multer = require("multer");
const path = require("path");
const fs = require("fs");
const upload = multer({ dest: "uploads/" });

function uploadAlbumArt(req, res, next) {
  const user_data = res.locals.user;
  upload.single("albumArtUP")(req, res, async (err) => {
    if (err) {
      console.error(err);
      return res.status(400).json({
        success: false,
        message: err,
      });
    }

    try {
      const { mainFolder, subFolder } = req.body;
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

      // If the file is in the database but not in the system, add it to the system
      if (!fs.existsSync(filePath)) {
        await fs.promises.writeFile(
          filePath,
          await fs.promises.readFile(file.path)
        );
      }
      fs.unlinkSync(file.path); // Delete the uploaded file

      return res.status(200).json({
        success: true,
        data: filePath,
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

module.exports = uploadAlbumArt;
