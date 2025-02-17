import { NextFunction, Request, Response } from "express";
import { db } from "../../db/db";
import {
  users as userSchema,
  tasks as taskSchema,
  taskAssignments as taskAssignmentSchema,
} from "../../db/schema";
import { count, desc, eq } from "drizzle-orm";
import { HttpException } from "../../config/error_handler";

export const fetchTasks = async (req: Request, res: Response) => {
  const tasks = await db
    .select()
    .from(taskSchema)
    .innerJoin(userSchema, eq(taskSchema.createdBy, userSchema.id))
    .orderBy(desc(taskSchema.createdAt));

  res.status(200).json({ success: true, data: tasks });
};

export const fetchTask = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  if (!taskId || taskId === "")
    throw new HttpException(400, "Task Id is required", "BAD_REQUEST");

  const task = await db
    .select()
    .from(taskSchema)
    .where(eq(taskSchema.id, taskId))
    .innerJoin(userSchema, eq(taskSchema.createdBy, userSchema.id));

  res.status(200).json({ success: true, data: task[0] });
};

export const fetchTaskAssignments = async (req: Request, res: Response) => {
  const taskId = req.params.id;

  if (!taskId || taskId === "")
    throw new HttpException(400, "Task Id is required", "BAD_REQUEST");

  const taskAssignments = await db
    .select()
    .from(taskAssignmentSchema)
    .where(eq(taskAssignmentSchema.taskId, taskId));

  res.status(200).json({ success: true, data: taskAssignments });
};
