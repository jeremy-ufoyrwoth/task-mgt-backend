import { Router } from "express";
import {
  fetchUser,
  fetchUsers,
  fetchUsersTasks,
} from "../../services/users/fetch.service";
import { useTryCatch } from "../../middleware/try_catch";

const routes = Router();

routes.get("/", useTryCatch(fetchUsers));
routes.get("/:id/tasks", useTryCatch(fetchUsersTasks));
routes.get("/:id", useTryCatch(fetchUser));

export default routes;
