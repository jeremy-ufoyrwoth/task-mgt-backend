import { Router } from "express";

import usersRoutes from "./users/routes";
import tasksRoutes from "./tasks/routes";
import taskAssignmentRoutes from "./task-assignment/routes";
import authRoutes from "./auth/routes";
import { authenticate } from "../middleware/authenticate";
import { useTryCatch } from "../middleware/try_catch";

const router = Router();

router.use("/users", useTryCatch(authenticate), usersRoutes);
router.use("/tasks", tasksRoutes);
router.use(
  "/task-assignments",
  useTryCatch(authenticate),
  taskAssignmentRoutes
);
router.use("/auth", authRoutes);

export default router;
