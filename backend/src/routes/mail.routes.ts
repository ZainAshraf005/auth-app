import { Router } from "express";
import {
  resetPassword,
  sendResetOtp,
  verifyOTP,
} from "../controllers/mail.controller";

const router = Router();

router.route("/reset-otp").post(sendResetOtp);
router.route("/verify-otp").post(verifyOTP);
router.route("/reset-password").post(resetPassword);

export default router;
