import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import passport from "passport";
import User from "../models/User";
import { configData } from "./data";

passport.use(
  new GoogleStrategy(
    {
      clientID: configData.GOOGLE_CLIENT_ID,
      clientSecret: configData.GOOGLE_CLIENT_SECRET,
      callbackURL: configData.GOOGLE_CALLBACK_URL,
    },
    async (_accessToken, _refreshToken, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails?.[0].value });

        if (!user) {
          user = await User.create({
            googleId: profile.id,
            fullname: profile.displayName,
            email: profile.emails?.[0].value,
            profilePic: profile.photos?.[0].value,
            isVarified: true,
            provider: "google",
          });
        } else {
          user.googleId = profile.id;
          user.fullname = profile.displayName;
          user.profilePic = profile.photos?.[0].value as string;
          user.isVarified = true;
          user.provider = "google";
          await user.save();
        }

        return done(null, user);
      } catch (error) {
        return done(error, false);
      }
    }
  )
);
