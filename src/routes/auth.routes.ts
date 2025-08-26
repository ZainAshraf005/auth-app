import { Router } from "express";
import { validate } from "../middlewares/validate";
import { loginSchema, registerSchema } from "../validators/auth.validators";
import {
  registerUser,
  loginUser,
  logoutUser,
  loggedInUser,
  deleteUser,
} from "../controllers/auth.controller";
import { authMiddleware } from "../middlewares/auth";

const router = Router();
// local credentials
router.route("/register").post(validate(registerSchema), registerUser);
router.route("/login").post(validate(loginSchema), loginUser);
router.route("/logout").post(logoutUser);
router.route("/delete").delete(authMiddleware, deleteUser);
router.route("/me").get(authMiddleware, loggedInUser);

export default router;
