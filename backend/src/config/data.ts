import { config } from "dotenv";

config();
export const configData = {
  CLIENT_URL: process.env.CLIENT_URL as string,
  MONGO_URI: process.env.MONGO_URI as string,
  JWT_SECRET: process.env.JWT_SECRET as string,
  PORT: process.env.PORT!,
  NODE_ENV: process.env.NODE_ENV!,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET as string,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL as string,
  CLIENT_FAILURE_REDIRECT: process.env.CLIENT_FAILURE_REDIRECT as string,
  CLIENT_SUCCESS_REDIRECT: process.env.CLIENT_SUCCESS_REDIRECT as string,
  EMAIL_USER: process.env.EMAIL_USER as string,
  EMAIL_PASS: process.env.EMAIL_PASS as string,
};
