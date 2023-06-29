const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const userRoutes = require("./routes/userRoute");
const musicRouter = require("./routes/musicRoutes");
const verify = require("./middlewares/verify_token");

const app = express(); // create express app

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));

// Dev logging middleware
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}
module.exports = app; // export app

// Routes
app.use("/api/users", verify.verifyAPIReq, userRoutes);
app.use("/api/music", verify.verifyAPIReq, musicRouter);
