import { Router } from "express";
import {
  getUsers,
  createUser,
  getUsersById,
  updateUser,
  deleteUser,
} from "../controllers/users.controller.ts";

const usersRouter = Router();

usersRouter.get("/", getUsers);
usersRouter.get("/:id", getUsersById);
usersRouter.post("/", createUser);
usersRouter.put("/:id", updateUser);
usersRouter.delete("/:id", deleteUser);

export default usersRouter;
