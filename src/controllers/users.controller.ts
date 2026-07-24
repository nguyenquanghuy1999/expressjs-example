import type { Request, Response } from "express";

type User = {
  id: number;
  name: string;
  address: string;
};

const users: User[] = [
  {
    id: 1,
    name: "A gờ",
    address: "add",
  },
];

export const getUsers = (req: Request, res: Response) => {
  res.json(users);
};

export const getUsersById = (req: Request, res: Response) => {
  const id = req.params.id;

  const user = users.find((u) => u.id === Number(id));
  if (!user) {
    res.status(404).json({ message: "User not found" });
  }
  res.json(user);
};

export const createUser = (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  const newUser = {
    id: users.length + 1,
    ...rest,
  };

  users.push(newUser);
  res.status(201).json(newUser);
};

export const updateUser = (req: Request, res: Response) => {
  const id = req.params.id;

  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    res.status(404).json({ message: "User not found" });
  }

  users[index] = {
    id: Number(id),
    name: req.body.name,
    address: req.body.address,
  };

  res.json(users[index]);
};

export const delelteUser = (req: Request, res: Response) => {
  const id = req.params.id;

  const index = users.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    res.status(404).json({ message: "User not found" });
  }

  users.splice(index, 1);
  res.status(204).send();
};
