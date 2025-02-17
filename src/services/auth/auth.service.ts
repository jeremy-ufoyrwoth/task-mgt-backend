import { Request, Response } from "express";
import { HttpException } from "../../config/error_handler";
import { db } from "../../db/db";
import { users } from "../../db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcrypt";
import { createToken } from "../../utils";

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || email === "")
    throw new HttpException(400, "Email is required", "BAD_REQUEST");

  if (!password || password === "")
    throw new HttpException(400, "Password is required", "BAD_REQUEST");

  // Check if user exists
  const user = await db.select().from(users).where(eq(users.email, email));

  if (!user[0]) throw new HttpException(404, "User not found", "NOT_FOUND");

  // Check if password is correct
  const isPasswordCorrect = await bcrypt.compare(password, user[0].password);

  if (!isPasswordCorrect)
    throw new HttpException(401, "Invalid password", "UNAUTHORIZED");

  // Generate token
  const response = await createToken({ id: user[0].id, email: user[0].email });

  if (response.error)
    throw new HttpException(
      500,
      response.message || "Something went wrong",
      "INTERNAL_SERVER_ERROR"
    );

  res.status(200).json({
    success: true,
    data: {
      token: response.token,
      user: { id: user[0].id, name: user[0].name, email: user[0].email },
    },
  });
};

export const signUpUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  // Check if email and password are provided
  if (!name || name === "")
    throw new HttpException(400, "Name is required", "BAD_REQUEST");
  if (!email || email === "")
    throw new HttpException(400, "Email is required", "BAD_REQUEST");
  if (!password || password === "")
    throw new HttpException(400, "Password is required", "BAD_REQUEST");

  // Check if user exists
  const user = await db.select().from(users).where(eq(users.email, email));

  if (user[0]) throw new HttpException(409, "User already exists", "CONFLICT");

  // Create the user
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await db
    .insert(users)
    .values({
      name,
      email,
      password: hashedPassword,
    })
    .returning();

  // Generate token
  const response = await createToken({
    id: newUser[0].id,
    email: newUser[0].email,
  });

  if (response.error)
    throw new HttpException(
      500,
      response.message || "Something went wrong",
      "INTERNAL_SERVER_ERROR"
    );

  res.status(200).json({
    success: true,
    data: {
      token: response.token,
      user: {
        id: newUser[0].id,
        name: newUser[0].name,
        email: newUser[0].email,
      },
    },
  });
};

export const logoutUser = async (req: Request, res: Response) => {
  res.status(200).json({ success: true, data: "User logged out" });
};
