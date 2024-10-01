import bcrypt from "bcrypt";
import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { checkSession, login, logout, register } from "../controllers/auth";
import User from "../models/User";
import { TUser } from "../models/userTypes";
import { redirectAuthenthicated, verifyAuth } from "../middlewares/authMiddleware";

const authUser: VerifyFunction = async (username: string, password, done) => {
  const user = await User.findOne({ username: username });

  if (!user) return done(null, false, { message: 'Incorrect username or password' });

  const passwordMatch = await bcrypt.compare(password, user.password!);
  if (!passwordMatch) return done(null, false, { message: "Incorrect username or password" });

  return done(null, user);
};

passport.use(new LocalStrategy(authUser));
passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser<TUser>((user, done) => {
  return done(null, user);
});

const router = express.Router();

router.post("/login", redirectAuthenthicated, login);
router.post("/register", register);
router.post("/logout", logout);
router.post("/check-session", verifyAuth, checkSession);

export default router;
