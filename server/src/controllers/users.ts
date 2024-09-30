import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";
import { BaseResponse } from "../lib/utils/BaseResponse";
import User from "../models/User";

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return next(new ErrorResponse("No users found", 404));

    const response = new BaseResponse(200, "success", user);
    return res.status(response.status).json(response);
  } catch (error) {
    console.log('here')
    next(error);
  }
};

export const getCookies = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const response = new BaseResponse(200, "", req.cookies);
  return res.status(response.status).json(response);
};