import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from "express";
import { BaseResponse } from "../lib/utils/BaseResponse";
import { ErrorResponse } from "../lib/utils/errorResponse";
import { UserRequestSchema } from "../lib/validation";
import User from "../models/User";
import { TUser } from '../types/userTypes';

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
  // const sessionUser = req.user as TUser

  // if (req.params.id !== sessionUser._id)

  req.user?.avatar

  try {
    const validated = UserRequestSchema.parse(req.body);

    if (validated.password) {
      validated.password = bcrypt.hashSync(
        validated.password,
        parseInt(process.env.SALT_ROUNDS!)
      );
    }

    const user = User.findByIdAndUpdate(req.params.id, {
      $set: validated
    }, { new: true });
    if (!user) return next(new ErrorResponse("User not found", 404));


  } catch (error) {
    
  }
};