const express = require("express");
const userController = require("../controllers/userController");
const { verifyUser } = require("../middlewares/verify_token");

const userRouter = express.Router();

userRouter.route("/signup").post(userController.signup);
userRouter.route("/login").post(userController.login);
userRouter
  .route("/loginWithToken")
  .get(verifyUser, userController.loginWithToken);

module.exports = userRouter;
