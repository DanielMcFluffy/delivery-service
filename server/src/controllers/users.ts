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
  const sessionUser = req.user as TUser
  if (req.params.id !== sessionUser._id) {
    return next(new ErrorResponse("Id is not session user id", 401));
  }

  try {
    const validated = UserRequestSchema.parse(req.body);

    if (validated.password) {
      validated.password = bcrypt.hashSync(
        validated.password,
        parseInt(process.env.SALT_ROUNDS ?? '10')
      );
    }

    const user = await User.findByIdAndUpdate(req.params.id, validated, { new: true });
    if (!user) return next(new ErrorResponse("User not found", 404));

    const { password, ...rest } = user.toObject();
    const response = new BaseResponse(200, "Success", rest);
    return res.status(response.status).json(response);
  } catch (error) {
    next(error);
  }
};