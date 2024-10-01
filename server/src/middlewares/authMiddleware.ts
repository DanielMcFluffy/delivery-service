import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";

export const verifyAuth = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) return next();

  return next(new ErrorResponse("Unauthorized", 401));
}