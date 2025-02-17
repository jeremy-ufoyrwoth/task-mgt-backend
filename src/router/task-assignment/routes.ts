import { Router } from "express";
import { createNewTaskAssignment } from "../../services/task-assignment/create.service";
import { deleteTaskAssignment } from "../../services/task-assignment/delete.service";
import { useTryCatch } from "../../middleware/try_catch";

const routes = Router();

routes.post("/", useTryCatch(createNewTaskAssignment));
routes.delete("/:id", useTryCatch(deleteTaskAssignment));

export default routes;
