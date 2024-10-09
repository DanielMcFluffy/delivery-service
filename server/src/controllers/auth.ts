import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import passport, { AuthenticateCallback } from "passport";
import { BaseResponse } from "../lib/utils/BaseResponse";
import { ErrorResponse } from "../lib/utils/errorResponse";
import { LoginRequestSchema, RegisterRequestSchema } from "../lib/validation";
import User from "../models/User";

export const login = async(req: Request, res: Response, next: NextFunction) =>
{
  try {
    LoginRequestSchema.parse(req.body);

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
  const validation = RegisterRequestSchema.parse(req.body)
  const { username, password, email } = validation;

  const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUNDS ?? '10'));

  await User.create({ username: username, email: email, password: hashPassword });
  const response = new BaseResponse(200, 'Registration successful', undefined);
  
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

export const checkSession = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.isAuthenticated()) {
      const response = new BaseResponse(200, "Valid session", true);
      return res.status(response.status).json(response);
    } else {
      const response = new BaseResponse(401, "Invalid session", false);
      return res.status(response.status).json(response);
    }
  } catch (error) {
    return next(error);
  }
};