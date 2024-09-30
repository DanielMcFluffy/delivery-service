import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import passport, { AuthenticateCallback } from "passport";
import { BaseResponse } from "../lib/utils/BaseResponse";
import { ErrorResponse } from "../lib/utils/errorResponse";
import { loginRequestSchema, registerRequestSchema } from "../lib/validation";
import User from "../models/User";

export const login = async(req: Request, res: Response, next: NextFunction) =>
{
  try {
    loginRequestSchema.parse(req.body)

    const authenthicateCallback: AuthenticateCallback = (err, user, info, status) => {
      if (err) return next(err);
      if (!user) return next(new ErrorResponse('User doesnt\'t exist', 404));
      
      req.logIn(user, (err) => {
        if (err) return next(err);
        const response = new BaseResponse(200, "Login successful", user);
        return res.status(response.status).json(response);
      });
    }

    passport.authenticate("local", authenthicateCallback)(req, res, next);
  } catch (error) {
    next(error)
  }
};

export const register = async(req: Request, res: Response, next: NextFunction) => {
  try {
  const validation = registerRequestSchema.parse(req.body)
  const { username, password, email } = validation;

  if (!username || !password || !email) {
    return next(new ErrorResponse('Please fill all required fields', 400));
  }

  const hashPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS!));

  const user = User.create({ username: username, email: email, password: hashPassword });

  const response = new BaseResponse(200, 'Registration successful', user);
  return res.status(response.status).json(response);
  } catch (error) {
    return next(error);
  }
}

export const logout = async (req: Request, res: Response, next: NextFunction) =>
{
  req.logOut({keepSessionInfo: false}, (err) => {
    if (err) next(err);
    const response = new BaseResponse(200, 'Logged out', undefined);
    return res.status(response.status).json(response);
  })
}