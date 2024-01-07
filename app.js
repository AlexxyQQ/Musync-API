const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

require("dotenv").config();

// Routes
const userRoutes = require("./routes/user.route");
const musicRouter = require("./routes/music.routes");

// Middleware
const { verifyAPIReq } = require("./middlewares/verify_token.mid");

// Express App Initialization
const app = express();

// Database Connection
const db_URI =
  process.env.NODE_ENV === "test"
    ? process.env.TEST_DATABASE
    : process.env.PRO_DATABASE;

mongoose
  .connect(db_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Database connection successful"))
  .catch((err) => console.error("Database connection error:", err));

// Middleware Setup
app.use(cors({ origin: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Static Files
app.use(express.static(path.join(__dirname, "/")));

// Logging Middleware for Development Environment
if (process.env.NODE_ENV === "dev") {
  app.use(morgan("dev"));
}

// API Routes
app.use("/api/users", verifyAPIReq, userRoutes);
app.use("/api/music", verifyAPIReq, musicRouter);

// Export Express App
module.exports = app;
