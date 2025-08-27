import { Router } from "express";
import passport from "passport";
import { configData } from "../config/data";
import { getToken } from "../utils/jwt";

const router = Router();

router
  .route("/google")
  .get(passport.authenticate("google", { scope: ["profile", "email"] }));

router.route("/google/callback").get((req, res, next) => {
  passport.authenticate(
    "google",
    { failureRedirect: configData.CLIENT_FAILURE_REDIRECT, session: false },
    (err, user, info) => {
      if (err || !user) return res.redirect(configData.CLIENT_FAILURE_REDIRECT);
      const token = getToken({ id: (user as any)._id });
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      res.redirect(configData.CLIENT_SUCCESS_REDIRECT);
    }
  )(req, res, next);
});

export default router;
