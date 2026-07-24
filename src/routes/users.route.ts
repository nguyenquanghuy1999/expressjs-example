import { Router } from "express";
import {
  getUsers,
  createUser,
  getUsersById,
  updateUser,
  delelteUser,
} from "../controllers/users.controller.ts";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUsersById);
usersRouter.post("/", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", delelteUser);

export default usersRouter;
