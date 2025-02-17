import { NextFunction, Request, Response } from "express";
import { db } from "../../db/db";
import {
  users as userSchema,
  tasks as taskSchema,
  taskAssignments as taskAssignmentSchema,
} from "../../db/schema";
import { desc, eq } from "drizzle-orm";
import { HttpException } from "../../config/error_handler";
import { asc } from "drizzle-orm";

export const fetchUser = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId || userId === "")
    throw new HttpException(400, "User Id is required", "BAD_REQUEST");

  const user = await db
    .select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
    })
    .from(userSchema)
    .where(eq(userSchema.id, userId));

  res.status(200).json({ success: true, data: user[0] });
};

export const fetchUsers = async (req: Request, res: Response) => {
  const user = await db
    .select({
      id: userSchema.id,
      name: userSchema.name,
      email: userSchema.email,
    })
    .from(userSchema);

  res.status(200).json({ success: true, data: user });
};

export const fetchUsersTasks = async (req: Request, res: Response) => {
  const userId = req.params.id;

  if (!userId || userId === "")
    throw new HttpException(400, "User Id is required", "BAD_REQUEST");

  const usersTasks = await db
    .select()
    .from(taskSchema)
    .where(eq(taskSchema.createdBy, userId))
    .orderBy(asc(taskSchema.isCompleted));

  const usersAssignedTasks = await db
    .select()
    .from(taskAssignmentSchema)
    .where(eq(taskAssignmentSchema.userId, userId))
    .orderBy(desc(taskAssignmentSchema.createdAt))
    .innerJoin(taskSchema, eq(taskAssignmentSchema.taskId, taskSchema.id))
    .innerJoin(userSchema, eq(taskSchema.createdBy, userSchema.id));

  res.status(200).json({
    success: true,
    data: {
      usersTasks,
      usersAssignedTasks: usersAssignedTasks.map((task) => ({
        ...task.task,
        user: task.user.name,
      })),
    },
  });
};
