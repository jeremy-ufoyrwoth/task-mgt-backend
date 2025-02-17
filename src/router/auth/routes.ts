import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signUpUser,
} from "../../services/auth/auth.service";
import { useTryCatch } from "../../middleware/try_catch";

const routes = Router();

routes.post("/login", useTryCatch(loginUser));
routes.post("/register", useTryCatch(signUpUser));
routes.post("/logout", useTryCatch(logoutUser));

export default routes;
