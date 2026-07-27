import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as userService from "../services/users.service.ts";

export const getUsers = async (req: Request, res: Response) => {
  const users = await userService.getUsers();
  res.json(users);
};

export const getUsersById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  const user = await userService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

export const updateUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  const user = await userService.updateUser(id, req.body);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  const result = await userService.deleteUser(id);

  if (result.deletedCount === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(204).send();
};
