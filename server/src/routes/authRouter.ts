import bcrypt from "bcrypt";
import express from "express";
import passport from "passport";
import { Strategy as LocalStrategy, VerifyFunction } from "passport-local";
import { checkSession, login, logout, register } from "../controllers/auth";
import User from "../models/User";
import { TUser } from "../types/userTypes";

const authUser: VerifyFunction = async (email: string, password, done) => {
  const user = await User.findOne({ email: email });

  if (!user) return done(null, false, { message: 'Incorrect username or password' });

  const passwordMatch = await bcrypt.compare(password, user.password!);
  if (!passwordMatch) return done(null, false, { message: "Incorrect username or password" });

  return done(null, user);
};

// change passport to use email instead of username to login
passport.use(new LocalStrategy({ usernameField: 'email' }, authUser));
passport.serializeUser((user, done) => {
  return done(null, user);
});

passport.deserializeUser<TUser>((user, done) => {
  return done(null, user as TUser);
});

const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("/check-session", checkSession);

export default router;
