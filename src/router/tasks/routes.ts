import { Router } from "express";
import {
  fetchTask,
  fetchTasks,
  fetchTaskAssignments,
} from "../../services/tasks/fetch.service";
import { useTryCatch } from "../../middleware/try_catch";
import { createNewTask } from "../../services/tasks/create.service";
import {
  updateTask,
  updateTaskStatus,
} from "../../services/tasks/update.service";
import { deleteTask } from "../../services/tasks/delete.service";
import { authenticate } from "../../middleware/authenticate";

const routes = Router();

routes.get("/", useTryCatch(fetchTasks));
routes.get("/:id/assignments", useTryCatch(fetchTaskAssignments));
routes.get("/:id", useTryCatch(fetchTask));
routes.post("/", useTryCatch(createNewTask));
routes.patch("/:id", useTryCatch(authenticate), useTryCatch(updateTask));
routes.patch(
  "/:id/status",
  useTryCatch(authenticate),
  useTryCatch(updateTaskStatus)
);
routes.delete("/:id", useTryCatch(authenticate), useTryCatch(deleteTask));

export default routes;
