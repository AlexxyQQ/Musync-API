const express = require("express");
const userController = require("../controllers/userController");

const userRouter = express.Router();

userRouter.route("/signup").get(userController.signup);

module.exports = userRouter;
