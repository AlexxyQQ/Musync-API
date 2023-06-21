const user_login = require("./user_controller/user_login");
const user_token_login = require("./user_controller/user_token_login");
const user_register = require("./user_controller/user_signup");

const user_controller_exports = {
  user_login,
  user_token_login,
  user_register,
};

module.exports = user_controller_exports;
