import nodemailer from "nodemailer";
import { configData } from "./data";
export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: configData.EMAIL_USER,
    pass: configData.EMAIL_PASS,
  },
});
