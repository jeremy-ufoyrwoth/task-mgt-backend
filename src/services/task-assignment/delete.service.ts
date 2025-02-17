import { Request, Response } from "express";
import { HttpException } from "../../config/error_handler";
import { db } from "../../db/db";
import { taskAssignments } from "../../db/schema";
import { eq } from "drizzle-orm";

export const deleteTaskAssignment = async (req: Request, res: Response) => {
  const taskAssignmentId = req.params.id;

  if (!taskAssignmentId || taskAssignmentId === "")
    throw new HttpException(
      400,
      "Task Assignment Id is required",
      "BAD_REQUEST"
    );

  // Delete the task assignment
  const deletedTaskAssignment = await db
    .delete(taskAssignments)
    .where(eq(taskAssignments.id, taskAssignmentId));

  res.status(200).json({ success: true, data: deletedTaskAssignment });
};
