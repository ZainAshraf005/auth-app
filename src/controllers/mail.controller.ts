import { NextFunction, Request, Response } from "express";
import { transporter } from "../config/nodeMailer";
import { configData } from "../config/data";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { sendOtpEmail } from "../utils/otp-email";

// Define OTP record type
interface OtpRecord {
  otp: number;
  expires: number;
}

// OTP store (in-memory; use DB in production)
const otpStore: Record<string, OtpRecord> = {};

export const sendResetOtp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, type } = req.body as {
    email: string;
    type: "reset" | "verify";
  };
  const userExist = await User.findOne({ email });
  if (!userExist)
    return res.status(400).json({
      message: "invalid email, please register your account.",
      success: false,
    });

  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
  otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 }; // expires in 5 mins

  try {
    await sendOtpEmail(email, otp, type);

    res.status(200).json({ message: "OTP sent to your email.", success: true });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Nodemailer error:", error.message);
    }
    next(error);
  }
};

export const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body as { email: string; otp: number | string };

  const record = otpStore[email];
  if (!record) {
    return res
      .status(400)
      .json({ success: false, message: "No OTP found for this email" });
  }

  if (record.expires < Date.now()) {
    delete otpStore[email];
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp !== Number(otp)) {
    return res.status(400).json({ success: false, message: "Invalid OTP" });
  }

  await User.findOneAndUpdate({ email }, { isVarified: true });

  // OTP valid → allow reset
  delete otpStore[email];
  return res.json({ success: true, message: "OTP verified" });
};

export const resetPassword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, newPassword } = req.body;

    const hashed = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email }, { password: hashed });
    res.json({ success: true, message: "Password reset successful" });
  } catch (error) {
    next(error);
  }
};
