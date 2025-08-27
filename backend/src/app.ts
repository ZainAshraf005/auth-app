import express from "express";
import cors from "cors";
import { configData } from "./config/data";
import cookieParser from "cookie-parser";
import { errorHandler } from "./middlewares/error-handler";
import authRoutes from "./routes/auth.routes";
import googleRoutes from "./routes/google.routes";
import mailRoutes from "./routes/mail.routes";
import passport from "passport";
import "./config/passport";

const app = express();

app.use(express.json());
app.use(cors({ origin: configData.CLIENT_URL, credentials: true }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);
app.use("/auth", googleRoutes);
app.use("/api/mail", mailRoutes);

app.use(errorHandler);

export default app;
