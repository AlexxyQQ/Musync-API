const express = require("express");
const musicController = require("../controllers/music.controller.export");
const { verifyUser } = require("../middlewares/verify_token.mid");
const io = require("../socket");

const musicRouter = express.Router();

// ---------------------
// Lyric Management
// ---------------------
musicRouter.route("/getLyrics").post(verifyUser, musicController.getLyrics);

// ---------------------
// Song Management
// ---------------------
musicRouter.route("/addSong").post(verifyUser, musicController.addSong);
musicRouter.route("/addSongs").post(verifyUser, musicController.addSongs);
musicRouter.route("/getAllSongs").get(verifyUser, musicController.getAllSongs);
musicRouter.route("/deleteSong").post(verifyUser, musicController.deleteSong);
musicRouter.route("/updateSong").post(verifyUser, musicController.updateSong);

// ---------------------
// Album Management
// ---------------------
musicRouter.route("/addAlbums").post(verifyUser, musicController.addAlbums);
musicRouter
  .route("/getAllAlbums")
  .get(verifyUser, musicController.getAllAlbums);

musicRouter.route("/deleteAlbum").post(verifyUser, musicController.deleteAlbum);

// ---------------------
// Artists Management
// ---------------------
musicRouter
  .route("/getAllArtists")
  .get(verifyUser, musicController.getAllArtists);

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
