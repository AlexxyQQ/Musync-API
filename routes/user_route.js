const express = require("express");
const user_controller = require("../controllers/user_controller_exports");
const { verifyUser } = require("../middlewares/verify_token");

const userRouter = express.Router();

userRouter.route("/signup").post(user_controller.user_register);
userRouter.route("/login").post(user_controller.user_login);
userRouter
  .route("/loginWithToken")
  .get(verifyUser, user_controller.user_token_login);
userRouter
  .route("/uploadProfilePic")
  .post(verifyUser, user_controller.upload_profile_pic);

userRouter.route("/deleteUser").post(verifyUser, user_controller.delete_user);
userRouter
  .route("/getListofUsers")
  .get(verifyUser, user_controller.list_of_users);
userRouter.route("/getUserData").post(verifyUser, user_controller.user_data);
userRouter.route("/otpValidator").post(user_controller.otp_validator);
userRouter
  .route("/sendForgotPasswordOTP")
  .post(user_controller.send_forgot_password_opt);
userRouter.route("/changePassword").post(user_controller.change_password);
userRouter
  .route("/resendVerification")
  .post(verifyUser, user_controller.resend_verification);

module.exports = userRouter;
