import { NextFunction } from "express";
import {Request, Response} from 'express';
import { ErrorResponse } from "../lib/utils/errorResponse";
import { ZodError } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

  let error = { ...err };
  error.message = err.message;

  console.error(err);

  // validation error
  if (err instanceof ZodError) {
    let validationErrors = '';
    for (const issue of error.issues) {
      validationErrors += (
        error.issues.indexOf(issue) !== (error.issues.length - 1) ? 
        issue.message + ', ' :
        issue.message
      )
    }
    error = new ErrorResponse(validationErrors, 400);
  }

  //duplicated key
  if (error.code === '23505') {
    error = new ErrorResponse(error.detail, 409)
  }

  res.status(error.status || 500).json({
    status: error.status,
    message: error.message || 'Server Error'
  });
};

