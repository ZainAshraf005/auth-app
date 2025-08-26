import { NextFunction, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { getToken } from "../utils/jwt";
import { configData } from "../config/data";
import { sendAccountDeletedEmail } from "../utils/account-delete-email";

// Add custom interface to extend Request with user property
declare global {
  namespace Express {
    interface Request {
      user?: any;
    }
  }
}

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Input validation
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email, and password are required",
        success: false,
      });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        message: "Invalid email format",
        success: false,
      });
    }

    // Password strength validation
    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
        success: false,
      });
    }

    const userExist = await User.findOne({ email: email.trim().toLowerCase() });

    if (userExist) {
      if (userExist.provider !== "local") {
        return res.status(400).json({
          message: `Email is registered with ${userExist.provider}. Please login using ${userExist.provider} or reset your password.`,
          success: false,
        });
      } else {
        return res
          .status(400)
          .json({ message: "User already exists", success: false });
      }
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      fullname: name,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
      profilePic: "",
      provider: "local",
      isVerified: false, // Fixed typo: isVarified -> isVerified
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: await User.findOne({ _id: newUser._id }).select("-password"),
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    // Input validation
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
        success: false,
      });
    }

    const user = await User.findOne({ email: email.trim().toLowerCase() });
    if (!user) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    // Check if user has a password (social login users might not have one)
    if (!user.password) {
      if (user.provider !== "local") {
        return res.status(400).json({
          message: `Please login using ${user.provider} or reset password`,
          success: false,
        });
      } else {
        return res.status(400).json({
          message: "Account issue. Please reset your password.",
          success: false,
        });
      }
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ message: "Invalid email or password", success: false });
    }

    const token = getToken({ id: user._id });
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: "lax", // Added for security
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: await User.findOne({ _id: user._id }).select("-password"),
    });
  } catch (error) {
    next(error);
  }
};

export const loggedInUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Check if user exists on request object
    if (!req.user || !req.user.id) {
      return res.status(401).json({
        message: "Not authenticated",
        success: false,
      });
    }

    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    res.status(200).json({ success: true, message: "Logged out successfully" });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.user?.id;

    if (!id) {
      return res.status(401).json({
        message: "Not authenticated",
        success: false,
      });
    }

    const userExist = await User.findById(id);
    if (!userExist) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    // Send email BEFORE deleting
    try {
      await sendAccountDeletedEmail({
        email: userExist.email,
        name: userExist.fullname,
        deletedAt: new Date(),
        supportUrl: `${configData.CLIENT_URL}/support`,
      });
    } catch (emailError) {
      // Log the error but don't stop the deletion process
      console.error("Failed to send account deletion email:", emailError);
    }

    await User.findByIdAndDelete(id);

    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });

    return res
      .status(200)
      .json({ message: "User deleted successfully", success: true });
  } catch (error) {
    next(error);
  }
};
