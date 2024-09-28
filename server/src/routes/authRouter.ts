import passport from 'passport';
import express from 'express';
import {Strategy as LocalStrategy} from 'passport-local';
import sql from '../db';
import { checkSession, login, logout, register } from '../controllers/auth';
import bcrypt from 'bcrypt';
import { User } from '../models/User';

passport.use(new LocalStrategy(async(username, password, done) => {
  
  const user = await sql`
    SELECT * FROM users
    WHERE username = ${username}
  ` as User[];

  const passwordMatch = await bcrypt.compare(password, user[0].password);

  if (!passwordMatch) return done(null, false);  

  if (!user.length) {
    return done(null, false);
  } 
    return done(null, user[0])
},));

passport.serializeUser((user, done) => {
  return done(null, user)
})

passport.deserializeUser((user, done) => {
  return done(null, user as any)
})

export const authRouter = express.Router();

authRouter
  .route('/login')
  .post(login);

authRouter
  .route('/register')
  .post(register);

authRouter
  .route('/check-session')
  .get(checkSession)

authRouter
  .route('/logout')
  .get(logout)

  