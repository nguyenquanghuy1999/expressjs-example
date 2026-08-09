import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as usersService from "../services/users.service.ts";

export const getUsers = async (req: Request, res: Response) => {
  const users = await usersService.getUsers();
  res.json(users);
};

export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid user id",
    });
  }

  const user = await usersService.getUserById(id);

  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.json(user);
};

export const createUser = async (req: Request, res: Response) => {
  const user = await usersService.createUser(req.body);
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

  const user = await usersService.updateUser(id, req.body);

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

  const result = await usersService.deleteUser(id || req.body._id);

  if (result.deletedCount === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  res.status(204).send();
};
