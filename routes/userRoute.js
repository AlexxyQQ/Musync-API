const express = require("express");
const user_controller = require("../controllers/user_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");

const userRouter = express.Router();

userRouter.route("/signup").post(user_controller.user_register);
userRouter.route("/login").post(user_controller.user_login);
userRouter
  .route("/loginWithToken")
  .get(verifyUser, user_controller.user_token_login);

module.exports = userRouter;
