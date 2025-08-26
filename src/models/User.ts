import { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  fullname: string;
  email: string;
  password?: string;
  profilePic: string;
  provider: "local" | "google";
  googleId?: string;
  verificationToken?: string;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  isVarified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema: Schema<IUser> = new Schema(
  {
    email: { type: String, required: true, unique: true },
    fullname: { type: String, required: true },
    password: { type: String },
    profilePic: { type: String },
    provider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String },
    isVarified: { type: Boolean, default: false },
    verificationToken: { type: String },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

const User = model<IUser>("User", userSchema);

export default User;
