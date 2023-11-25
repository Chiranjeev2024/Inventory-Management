import express from "express";
import ProductController from "./src/controller/product.controller.js";
import { validateRequest } from "./src/middlewares/validation.middleware.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";

const port = process.env.PORT || 3001;

const server = express();

//parse form data
server.use(express.urlencoded({ extended: true }));

// setup view engine settings
server.set("view engine", "ejs");
// path of our views
const pathOfviews = path.join(path.resolve(), "src", "views");
server.set("views", pathOfviews);

//setting layout
server.use(ejsLayouts);

const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
//Handling post request for adding new product
server.post("/", validateRequest, productController.addNewProduct);
server.listen(port, () => console.log(`server started at ${port} 3500`));
