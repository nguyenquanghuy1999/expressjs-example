import type { Request, Response } from "express";

type Product = {
  id: number;
  name: string;
  price: number;
};

const products: Product[] = [
  {
    id: 1,
    name: "item 1 da update",
    price: 3123123,
  },
];

export const getProducts = (req: Request, res: Response) => {
  res.json(products);
};

export const getProductsById = (req: Request, res: Response) => {
  const id = req.params.id;

  const product = products.find((u) => u.id === Number(id));
  if (!product) {
    res.status(404).json({ message: "product not found" });
  }
  res.json(product);
};

export const createProduct = (req: Request, res: Response) => {
  const { id, ...rest } = req.body;

  const newproduct = {
    id: products.length + 1,
    ...rest,
  };

  products.push(newproduct);
  res.status(201).json(newproduct);
};

export const updateProduct = (req: Request, res: Response) => {
  const id = req.params.id;

  const index = products.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    res.status(404).json({ message: "product not found" });
  }

  products[index] = {
    id: Number(id),
    name: req.body.name,
    price: req.body.price,
  };

  res.json(products[index]);
};

export const delelteProduct = (req: Request, res: Response) => {
  const id = req.params.id;

  const index = products.findIndex((u) => u.id === Number(id));

  if (index === -1) {
    res.status(404).json({ message: "product not found" });
  }

  products.splice(index, 1);
  res.status(204).send();
};
