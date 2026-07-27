import express, { type Express } from "express";
import usersRouter from "./routes/users.route.ts";
import productsRouter from "./routes/products.route.ts";
import "dotenv/config";

const PORT = process.env.PORT;
const app: Express = express();

app.use(express.json());
app.use("/api/users", usersRouter);
app.use("/api/products", productsRouter);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
