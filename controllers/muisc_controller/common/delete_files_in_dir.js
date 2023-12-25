const fs = require("fs");
const path = require("path");

async function deleteFilesInDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath);

  for (const file of files) {
    const filePath = path.join(directoryPath, file);

    try {
      // Check if the current file is a directory
      const stats = fs.statSync(filePath);
      if (stats.isDirectory()) {
        // Recursively delete subdirectory and its contents
        await deleteFilesInDirectory(filePath);
        fs.rmdirSync(filePath);
      } else {
        fs.unlinkSync(filePath); // Delete the file
      }
    } catch (error) {
      console.error(`Failed to delete file: ${filePath}`, error);
    }
  }
}

module.exports = deleteFilesInDirectory;
