import { NextFunction, Request, Response } from "express";

import { useError } from "./error";
import { PrismaErrors } from "../constants";
import { HttpException } from "../config/error_handler";

export const useTryCatch =
  (fn: (req: Request, res: Response, next: NextFunction) => void) =>
  (req: Request, res: Response, next: any) =>
    Promise.resolve(fn(req, res, next)).catch((error: any) => {
      let message = error?.message || "Unexpected error";
      let code = error?.code || "";
      let status = error?.status || 500;

      if (error?.name === "PrismaClientValidationError") {
        message = "Validation error";
        status = 400;
      }

      const HttpExceptionError: HttpException = {
        status,
        message,
        name: error.name,
        errorCode: code,
        stack: error.stack,
      };

      useError(HttpExceptionError, req, res, next);
    });
