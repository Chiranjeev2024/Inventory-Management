import express from "express";
import ProductController from "./src/controller/product.controller.js";

const server = express();

const productController = new ProductController();

server.get("/", productController.getProducts);

server.listen(3400);
