import mongoose from "mongoose";
import { configData } from "../config/data";

export const connectDB = async () => {
  // Database connection logic here
  const URI = configData.MONGO_URI;
  try {
    await mongoose.connect(URI);
    console.log("MongoDB connected");
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};
