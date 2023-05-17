const express = require("express");

const userRoutes = require("./routes/userRoute");
const verify = require("./middlewares/verify_token");

const app = express(); // create express app

app.use(express.json());
module.exports = app; // export app

// Routes
app.use("/api/users", verify.verifyAPIReq, userRoutes);
