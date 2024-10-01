import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();

  res.redirect(process.env.CLIENT_URL! + '/home');
  return next(new ErrorResponse("Unauthorized", 401));
}

export const redirectAuthenthicated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) res.redirect('/dashboard');
  next();
}