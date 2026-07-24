import { Router } from "express";
import {
  createProduct,
  delelteProduct,
  getProducts,
  getProductsById,
  updateProduct,
} from "../controllers/products.controller.ts";

const productsRouter = Router();

productsRouter.get("/", getProducts);
productsRouter.get("/:id", getProductsById);
productsRouter.post("/", createProduct);
productsRouter.put("/:id", updateProduct);
productsRouter.delete("/:id", delelteProduct);

export default productsRouter;
