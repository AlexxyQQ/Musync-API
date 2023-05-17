const express = require("express");

const userRoutes = require("./routes/userRoute");

const app = express(); // create express app

app.use(express.json());

// Routes
app.use("/api/users", userRoutes);

module.exports = app; // export app
