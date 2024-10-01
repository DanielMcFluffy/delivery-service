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
    if (!user) return next(new ErrorResponse("User not found", 404));
    const response = new BaseResponse(200, "success", user);

    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = User.findById(req.params.id);
    if (!user) return next(new ErrorResponse("User not found", 404));


  } catch (error) {
    
  }
};