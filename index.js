import express from "express";
import ProductController from "./src/controller/product.controller.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
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
//Handle post request for adding new product
server.post("/", productController.addNewProduct);
server.listen(3500, () => console.log("server started at port 3500"));
