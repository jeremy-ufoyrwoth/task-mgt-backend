import { Request, Response } from "express";

import { HttpException } from "../../config/error_handler";
import { db } from "../../db/db";
import { taskAssignments } from "../../db/schema";
import { and, eq } from "drizzle-orm";

export const createNewTaskAssignment = async (req: Request, res: Response) => {
  const { taskId, userId } = req.body;

  if (!taskId || taskId === "")
    throw new HttpException(400, "Task Id is required", "BAD_REQUEST");

  if (!userId || userId === "")
    throw new HttpException(400, "User Id is required", "BAD_REQUEST");

  const alreadyAssigned = await db
    .select()
    .from(taskAssignments)
    .where(
      and(
        eq(taskAssignments.taskId, taskId),
        eq(taskAssignments.userId, userId)
      )
    );

  if (alreadyAssigned[0])
    throw new HttpException(
      400,
      "Task already assigned to user",
      "BAD_REQUEST"
    );

  // Create the task assignment
  const newTaskAssignment = await db.insert(taskAssignments).values({
    taskId,
    userId,
  });

  res.status(201).json({ success: true, data: newTaskAssignment });
};
