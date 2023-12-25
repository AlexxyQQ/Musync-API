const user_login = require("./user_controller/user_login");
const user_token_login = require("./user_controller/user_token_login");
const user_register = require("./user_controller/user_signup");
const upload_profile_pic = require("./user_controller/upload_profile_pic");
const delete_user = require("./user_controller/delete_user");
const list_of_users = require("./user_controller/list_of_users.js");
const user_data = require("./user_controller/user_data.js");
const otp_validator = require("./user_controller/otp_validator.js");
const send_forgot_password_opt =
  require("./user_controller/forgot_password.js").sendforgotPasswordOTP;
const change_password =
  require("./user_controller/forgot_password.js").changePassword;
const resend_verification = require("./user_controller/resent_verification.js");
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
