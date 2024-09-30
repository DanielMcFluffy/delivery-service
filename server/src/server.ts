import cookieParser from 'cookie-parser';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import express from "express";
import session from 'express-session';
import mongoose from "mongoose";
import morgan from "morgan";
import passport from 'passport';
import path from 'path';
import { errorHandler } from "./middlewares/errorMiddleware";
import authRouter from "./routes/authRouter";
import usersRouter from "./routes/usersRouter";

configDotenv({ path: path.resolve(__dirname, "../../config.env") });
const PORT = process.env.PORT || 5050; 
mongoose
  .connect(
    process.env.CONNECTION_STRING!
  )
  .then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(cors({credentials: true, origin: process.env.CLIENT_URL}));
app.use(cookieParser());
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(session({
  secret: process.env.SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    maxAge: 60 * 60 * 1000,
    httpOnly: true
  },
}));

app.use(passport.session());

app.use('/api/auth', authRouter)
app.use('/api/user', usersRouter)
app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`start listening on port : ${PORT}`)
);
