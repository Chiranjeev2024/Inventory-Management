import express from "express";
import ProductController from "./src/controller/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
const server = express();
server.set("view engine", "ejs");

const pathOfviews = path.join(path.resolve(), "src", "views");
server.set("views", pathOfviews);
server.use(ejsLayouts);

const productController = new ProductController();

server.get("/", productController.getProducts);

server.listen(3400);
