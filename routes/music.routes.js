const express = require("express");
const musicController = require("../controllers/music.controller.export");
const { verifyUser } = require("../middlewares/verify_token.mid");
const io = require("../socket");

const musicRouter = express.Router();

// ---------------------
// Lyric Management
// ---------------------
musicRouter.route("/getlyric").post(verifyUser, musicController.getLyric);

// ---------------------
// Album Management
// ---------------------
musicRouter
  .route("/uploadAlbumArt")
  .post(verifyUser, musicController.uploadAlbumArt);
musicRouter.route("/addAlbums").post(verifyUser, musicController.addAlbums);
musicRouter
  .route("/getAllAlbums")
  .get(verifyUser, musicController.getAllAlbums);
musicRouter
  .route("/getAllAlbumWithSongs")
  .get(verifyUser, musicController.getAllAlbumWithSongs);

// ---------------------
// Song Management
// ---------------------
musicRouter.route("/addAllSongs").post(verifyUser, musicController.addAllSongs);
musicRouter.route("/getAllSongs").get(verifyUser, musicController.getAllSongs);
musicRouter.route("/getAllPublicSongs").get(musicController.getAllPublicSongs);
musicRouter
  .route("/getUserPublicSongs")
  .get(verifyUser, musicController.getUserPublicSongs);
musicRouter.route("/deleteSong").post(musicController.deleteSong);

// ---------------------
// Folder Management
// ---------------------
musicRouter
  .route("/getAllFolderWithSongs")
  .get(verifyUser, musicController.getAllFolderWithSongs);
musicRouter
  .route("/getAllFolders")
  .get(verifyUser, musicController.getAllFolders);
musicRouter
  .route("/getFolderSongs")
  .post(verifyUser, musicController.getFolderSongs);
musicRouter.route("/addFolders").post(verifyUser, musicController.addFolders);

// ---------------------
// Artist Management
// ---------------------
musicRouter
  .route("/getAllArtistWithSongs")
  .get(verifyUser, musicController.getAllArtistWithSongs);

// ---------------------
// Playlist Management
// ---------------------
musicRouter
  .route("/addToPlaylist")
  .post(verifyUser, musicController.addToPlaylist);
musicRouter
  .route("/createPlaylist")
  .get(verifyUser, musicController.createPlaylist);
musicRouter
  .route("/getPlaylists")
  .get(verifyUser, musicController.getPlaylists);

// ---------------------
// Public/Private Toggling
// ---------------------
musicRouter
  .route("/tooglePublic")
  .post(verifyUser, musicController.togglePublic);

// ---------------------
// Socket.IO Integration
// ---------------------
const userRooms = {};

io.on("connection", (socket) => {
  const userEmail = socket.handshake.query.userEmail;
  const uid = socket.handshake.query.uid;

  console.log("User connected:", userEmail, uid);

  socket.join(userEmail);

  if (!userRooms[userEmail]) {
    userRooms[userEmail] = [socket];
  } else {
    userRooms[userEmail].push(socket);
  }

  socket.on("shared", (data) => {
    console.log("Shared:", data);
    const socketsInRoom = userRooms[userEmail];
    for (const roomSocket of socketsInRoom) {
      if (
        roomSocket.id !== socket.id &&
        roomSocket.handshake.query.uid !== uid
      ) {
        roomSocket.emit("shared-song", data);
      }
    }
  });

  socket.on("disconnect", () => {
    if (userRooms[userEmail]) {
      userRooms[userEmail] = userRooms[userEmail].filter(
        (roomSocket) => roomSocket.id !== socket.id
      );
      if (userRooms[userEmail].length === 0) {
        delete userRooms[userEmail];
      }
    }
  });
});

module.exports = musicRouter;
