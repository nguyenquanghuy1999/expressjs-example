import { ObjectId } from "mongodb";
import { db } from "../db.ts";

export const getProducts = () => {
  return db.collection("products").find().toArray();
};

export const getProductById = (id: string) => {
  return db.collection("products").findOne({
    _id: new ObjectId(id),
  });
};

export const createProduct = async (data: any) => {
  const newProduct = {
    ...data,
    createdAt: new Date(),
  };

  const result = await db.collection("products").insertOne(newProduct);

  return {
    _id: result.insertedId,
    ...newProduct,
  };
};

export const updateProduct = async (id: string, data: any) => {
  return db.collection("products").findOneAndUpdate(
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

export const deleteProduct = (id: string) => {
  return db.collection("products").deleteOne({
    _id: new ObjectId(id),
  });
};
