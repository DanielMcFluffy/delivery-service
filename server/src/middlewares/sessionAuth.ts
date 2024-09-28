import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";

export const sessionAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!(req.session as any)?.passport?.user?.username) {
    return next(new ErrorResponse('Unauthorized', 401));
  }
  
  return  next();

}
