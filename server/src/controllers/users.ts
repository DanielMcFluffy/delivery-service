import { NextFunction, Request, Response } from "express";
import { ErrorResponse } from "../lib/utils/errorResponse";
import sql from "../db";
import { BaseResponse } from "../lib/utils/BaseResponse";

export const getUsers = async(req: Request, res: Response, next: NextFunction) => {
  const users = await sql`
    SELECT * FROM users
  `
  console.log(users);

  if (!users.length) {
    return next(new ErrorResponse('No users found', 404));
  }
  
  const response = new BaseResponse(200, 'success', users)
  return res.status(response.status).json(response);
}