import express from "express";
import cartRouter from "./api/cart/cart.controller";

export const app = express();

app.use(express.json());

app.use("/cart", cartRouter);
