const user_login = require("./user_controller/public/user_login.controller.js");
const user_token_login = require("./user_controller/public/user_token_login.controller.js");
const user_register = require("./user_controller/public/user_signup.controller.js");
const upload_profile_pic = require("./user_controller/public/upload_profile_pic.controller.js");
const delete_user = require("./user_controller/public/delete_user.controller.js");
const list_of_users = require("./user_controller/admin/list_of_users.controller.js");
const user_data = require("./user_controller/admin/user_data.controller.js");
const otp_validator = require("./user_controller/public/otp_validator.controller.js");
const send_forgot_password_opt =
  require("./user_controller/public/forgot_password.controller.js").sendforgotPasswordOTP;
const change_password =
  require("./user_controller/public/forgot_password.controller.js").changePassword;
const resend_verification = require("./user_controller/public/resent_verification.controller.js");
const user_controller_exports = {
  user_login,
  user_token_login,
  user_register,
  upload_profile_pic,
  delete_user,
  list_of_users,
  user_data,
  otp_validator,
  send_forgot_password_opt,
  change_password,
  resend_verification,
};

module.exports = user_controller_exports;
