import type { Request, Response } from "express";
import { ObjectId } from "mongodb";
import * as productsService from "../services/products.service.ts";

export const getProducts = async (req: Request, res: Response) => {
  const product = await productsService.getProducts();
  res.json(product);
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const product = await productsService.getProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

export const createProduct = async (req: Request, res: Response) => {
  console.log("info product: ", req.body);

  const product = await productsService.createProduct(req.body);
  res.status(201).json(product);
};

export const updateProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const product = await productsService.updateProduct(id, req.body);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.json(product);
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response,
) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({
      message: "Invalid product id",
    });
  }

  const result = await productsService.deleteProduct(id);

  if (result.deletedCount === 0) {
    return res.status(404).json({
      message: "Product not found",
    });
  }

  res.status(204).send();
};
