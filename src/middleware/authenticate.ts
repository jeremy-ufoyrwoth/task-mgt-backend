import { NextFunction, Request, Response } from "express";
import { HttpException } from "../config/error_handler";
import { verifyToken } from "../utils";
import { db } from "../db/db";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const auth = req.headers.authorization;

  const token = auth?.split(" ")[1];

  if (!token)
    throw new HttpException(
      401,
      "Unauthorized. Token not found",
      "UNAUTHORIZED"
    );

  const decoded = await verifyToken(token);

  if (decoded.error)
    throw new HttpException(
      401,
      decoded.message || "Unauthorized",
      "UNAUTHORIZED"
    );

  const data = decoded.decoded as any;

  const userId = data?.id;

  if (!userId)
    throw new HttpException(
      401,
      "Unauthorized. User not found",
      "UNAUTHORIZED"
    );

  const user = await db.select().from(users).where(eq(users.id, userId));

  if (!user[0])
    throw new HttpException(
      401,
      "Unauthorized. User not found",
      "UNAUTHORIZED"
    );

  (req as any).user = {
    id: user[0].id,
    email: user[0].email,
  };

  next();
};
