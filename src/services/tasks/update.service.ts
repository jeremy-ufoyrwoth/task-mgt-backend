import { Request, Response } from "express";
import { HttpException } from "../../config/error_handler";
import { db } from "../../db/db";
import { tasks } from "../../db/schema";
import { eq } from "drizzle-orm";

export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  const { name, description } = req.body;

  if (!taskId || taskId === "")
    throw new HttpException(400, "Task Id is required", "BAD_REQUEST");

  const task = await db.select().from(tasks).where(eq(tasks.id, taskId));

  if (!task[0]) throw new HttpException(404, "Task not found", "NOT_FOUND");

  const data = {
    name: name || task[0].name,
    description: description || task[0].description,
  };

  const updatedTask = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, taskId));

  res.status(200).json({ success: true, data: updatedTask });
};

export const updateTaskStatus = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  const { isCompleted } = req.body;

  if (!taskId || taskId === "")
    throw new HttpException(400, "Task Id is required", "BAD_REQUEST");

  const task = await db.select().from(tasks).where(eq(tasks.id, taskId));

  if (!task[0]) throw new HttpException(404, "Task not found", "NOT_FOUND");

  const data = { isCompleted };

  const updatedTask = await db
    .update(tasks)
    .set(data)
    .where(eq(tasks.id, taskId));

  res.status(200).json({ success: true, data: updatedTask });
};
