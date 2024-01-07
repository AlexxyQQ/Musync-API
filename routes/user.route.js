const express = require("express");
const userController = require("../controllers/user.controller.export");
const { verifyUser } = require("../middlewares/verify_token.mid");

const userRouter = express.Router();

// ---------------------
// User Authentication
// ---------------------
userRouter.route("/signup").post(userController.user_register);
userRouter.route("/login").post(userController.user_login);
userRouter
  .route("/loginWithToken")
  .get(verifyUser, userController.user_token_login);

// ---------------------
// User Profile Management
// ---------------------
userRouter
  .route("/uploadProfilePic")
  .post(verifyUser, userController.upload_profile_pic);
userRouter.route("/deleteUser").post(verifyUser, userController.delete_user);
userRouter.route("/getUserData").post(verifyUser, userController.user_data);

// ---------------------
// Password Management
// ---------------------
userRouter.route("/changePassword").post(userController.change_password);
userRouter
  .route("/sendForgotPasswordOTP")
  .post(userController.send_forgot_password_opt);
userRouter.route("/otpValidator").post(userController.otp_validator);

// ---------------------
// User Verification
// ---------------------
userRouter
  .route("/resendVerification")
  .post(verifyUser, userController.resend_verification);

// ---------------------
// User List Retrieval
// ---------------------
userRouter
  .route("/getListofUsers")
  .get(verifyUser, userController.list_of_users);

module.exports = userRouter;
