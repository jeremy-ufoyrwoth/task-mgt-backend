import { NextFunction, Request, Response } from "express";
import { HttpException } from "../config/error_handler";

export const useError = (
  { name, stack, status, message, errorCode }: HttpException,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(status).json({
    success: false,
    message,
  });
};

export interface ErrorCodesMessages {
  [key: string]: string;
}
