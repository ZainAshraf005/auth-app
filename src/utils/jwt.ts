import jwt from "jsonwebtoken";
import { configData } from "../config/data";

export const getToken = (payload: object) => {
  return jwt.sign(payload, configData.JWT_SECRET, { expiresIn: "7d" });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, configData.JWT_SECRET);
  } catch (error) {
    return null;
  }
};
