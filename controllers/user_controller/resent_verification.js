const User = require("../../models/user_model");
const bcryptjs = require("bcryptjs");
const sendEmail = require("../common/send_email");
const generateOTP = require("../common/otp_generator");

async function resendVerification(req, res) {
  try {
    const user = await User.findOne({ email: res.locals.user["email"] });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Token Expired",
      });
    } else {
      if (user.verified) {
        return res.status(400).json({
          success: false,
          message: "User already verified!",
        });
      }

      const sixDigitOTP = generateOTP();

      // Send OTP to email
      await sendEmail(
        user.email, // Recipient's email address
        "Email Verification OTP for Rantit", // Email subject
        `The OTP for your email is ${sixDigitOTP}.` // Plain text body
      );

      // Save OTP in the database
      await User.findOneAndUpdate(
        { email: user.email },
        { $set: { otp: sixDigitOTP } },
        { new: true }
      );

      res.status(200).json({
        success: true,
        message: "OTP sent to your email!",
      });
    }
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
}

module.exports = resendVerification;
