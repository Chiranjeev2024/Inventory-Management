import express from "express";
import ProductController from "./src/controller/product.controller.js";
import { validateRequest } from "./src/middlewares/validation.middleware.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import UserController from "./src/controller/user.controller.js";
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
const userController = new UserController();
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);

const productController = new ProductController();

server.get("/", productController.getProducts);
server.get("/new", productController.getAddForm);
//Handling post request for adding new product
server.post("/", validateRequest, productController.addNewProduct);
//Handle request for getting the view to update the product
server.get("/update-product/:id", productController.getUpdateProductView);
//Handle request for updating the product
server.post("/update-product/", productController.postUpdateProduct);
//Handle reqeust for deleting the product
server.post("/delete-product/:id", productController.deleteProduct);

server.use(express.static("src/views"));
server.use(express.static("public"));
server.listen(port, () => console.log(`server started at ${port} 3500`));
