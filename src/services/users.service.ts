import { ObjectId } from "mongodb";
import { db } from "../db.ts";

export const getUsers = () => {
  return db.collection("users").find().toArray();
};

export const getUserById = (id: string) => {
  return db.collection("users").findOne({
    _id: new ObjectId(id),
  });
};

export const createUser = async (data: any) => {
  const newUser = {
    ...data,
    createdAt: new Date(),
  };

  const result = await db.collection("users").insertOne(newUser);

  return {
    _id: result.insertedId,
    ...newUser,
  };
};

export const updateUser = async (id: string, data: any) => {
  return db.collection("users").findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: data,
    },
    {
      returnDocument: "after",
    },
  );
};

export const deleteUser = (id: string) => {
  return db.collection("users").deleteOne({
    _id: new ObjectId(id),
  });
};
