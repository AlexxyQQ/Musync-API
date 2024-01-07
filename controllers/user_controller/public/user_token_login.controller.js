const User = require("../../../models/user.model");

async function loginWithToken(req, res) {
  try {
    /* The line `const user = await User.findOne({ email: res.locals.user["email"] });` is querying the
database to find a user with the email that is stored in the `res.locals.user` object. It is using
the `findOne` method of the `User` model to search for a user document in the database that matches
the specified email. The result is stored in the `user` variable. */
    const user = await User.findOne({ email: res.locals.user["email"] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    } else {
      // remove password and otp from user object
      user.password = undefined;
      user.otp = undefined;
      res.json({
        success: true,
        data: {
          user,
          token: res.locals.token,
        },
        message: "User logged in successfully!",
      });
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

module.exports = loginWithToken;
