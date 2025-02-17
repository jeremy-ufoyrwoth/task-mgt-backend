import { Request, Response } from "express";

import { HttpException } from "../../config/error_handler";
import { db } from "../../db/db";
import { tasks, users } from "../../db/schema";
import { eq } from "drizzle-orm";

export const createNewTask = async (req: Request, res: Response) => {
  const { name, description, userId, isCompleted } = req.body;

  if (!name || name === "")
    throw new HttpException(400, "Name is required", "BAD_REQUEST");
  if (!userId || userId === "")
    throw new HttpException(400, "User Id is required", "BAD_REQUEST");

  const user = await db.select().from(users).where(eq(users.id, userId));

  if (!user[0]) throw new HttpException(404, "User not found", "NOT_FOUND");

  // Create the task
  const newTask = await db
    .insert(tasks)
    .values({
      name,
      description,
      createdBy: userId,
      isCompleted,
    })
    .returning();

  res.status(201).json({ success: true, data: newTask[0] });
};
