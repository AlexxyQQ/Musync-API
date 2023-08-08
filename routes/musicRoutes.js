const express = require("express");
const musicController = require("../controllers/music_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");
const io = require("../socket");

const musicRouter = express.Router();

musicRouter
  .route("/uploadAlbumArt")
  .post(verifyUser, musicController.uploadAlbumArt);

//  All Songs
musicRouter.route("/addAllSongs").post(verifyUser, musicController.addAllSongs);

musicRouter.route("/getAllSongs").get(verifyUser, musicController.getAllSongs);

musicRouter.route("/getAllPublicSongs").get(musicController.getAllPublicSongs);

// All Folders
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

// All Artists
musicRouter
  .route("/getAllArtistWithSongs")
  .get(verifyUser, musicController.getAllArtistWithSongs);

// All Albums
musicRouter.route("/addAlbums").post(verifyUser, musicController.addAlbums);
musicRouter
  .route("/getAllAlbums")
  .get(verifyUser, musicController.getAllAlbums);
musicRouter
  .route("/getAllAlbumWithSongs")
  .get(verifyUser, musicController.getAllAlbumWithSongs);

// All Playlist
musicRouter
  .route("/addToPlaylist")
  .post(verifyUser, musicController.addToPlaylist);
musicRouter
  .route("/createPlaylist")
  .get(verifyUser, musicController.createPlaylist);
musicRouter
  .route("/getPlaylists")
  .get(verifyUser, musicController.getPlaylists);

musicRouter
  .route("/tooglePublic")
  .post(verifyUser, musicController.togglePublic);

musicRouter.route("/deleteSong").post(musicController.deleteSong);

const userRooms = {};

io.on("connection", (socket) => {
  const userEmail = socket.handshake.query.userEmail;
  const uid = socket.handshake.query.uid;

  console.log("user connected", userEmail, uid);

  // Create or join the room for the userEmail
  socket.join(userEmail);

  // Store the user's socket in the room object for that userEmail
  if (!userRooms[userEmail]) {
    userRooms[userEmail] = [socket];
  } else {
    userRooms[userEmail].push(socket);
  }

  socket.on("shared", (data) => {
    console.log("shared", data);
    // Broadcast the data to all sockets in the userEmail room except the one with the same uid
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
    // Remove the socket from the room object when the user disconnects
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
