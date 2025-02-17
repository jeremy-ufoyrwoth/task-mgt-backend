import { Request, Response } from "express";
import { HttpException } from "../../config/error_handler";
import { db } from "../../db/db";
import { tasks } from "../../db/schema";
import { eq } from "drizzle-orm";

export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  if (!taskId || taskId === "")
    throw new HttpException(400, "Task Id is required", "BAD_REQUEST");

  // Delete the task
  const deletedTask = await db.delete(tasks).where(eq(tasks.id, taskId));

  res.status(200).json({ success: true, data: deletedTask });
};
