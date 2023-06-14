const express = require("express");

const userRoutes = require("./routes/userRoute");
const musicRouter = require("./routes/musicRoutes");
const verify = require("./middlewares/verify_token");

const app = express(); // create express app

app.use(express.json());
module.exports = app; // export app

// Routes
app.use("/api/users", verify.verifyAPIReq, userRoutes);
app.use("/api/music", verify.verifyAPIReq, musicRouter);
