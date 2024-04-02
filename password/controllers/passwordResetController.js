import bcrypt from 'bcrypt';
import ResetPassword from '../models/resetPasswordModel.js';
import { sendOTP } from '../services/emailService.js';

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpiry = new Date(Date.now() + 10 * 60 * 1000);

    const existingResetPassword = await ResetPassword.findOne({ where: { email } });

    if (!existingResetPassword) {
      return res.status(400).json({ message: 'No user found with this email' });
    }

    await existingResetPassword.update({ otp, otpExpiry });

    const isSent = await sendOTP(email, otp);

    if (isSent) {
      res.status(200).json({ message: 'OTP sent to your email' });
    } else {
      throw new Error('Failed to send OTP');
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to send OTP', error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const resetPassword = await ResetPassword.findOne({ where: { email, otp } });

    if (!resetPassword || resetPassword.otpExpiry < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await ResetPassword.update({ password: hashedPassword }, { where: { email } });

   
    await resetPassword.update({ otp: null, otpExpiry: null });

    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};


