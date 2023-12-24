import express from "express";
import ProductController from "./src/controller/product.controller.js";
import { validateRequest } from "./src/middlewares/validation.middleware.js";
import path from "path";
import ejsLayouts from "express-ejs-layouts";
import UserController from "./src/controller/user.controller.js";
import session from "express-session";
import { auth } from "./src/middlewares/auth.middleware.js";
import { uploadFile } from "./src/middlewares/file-upload.middleware.js";
import cookieParser from "cookie-parser";
import { setLastVisit } from "./src/middlewares/lastVisit.middleware.js";

const port = process.env.PORT || 3001;

const server = express();

server.use(cookieParser());
// server.use(setLastVisit);

server.use(
  session({
    secret: "SecretKey",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//parse form data
server.use(express.urlencoded({ extended: true }));

// setup view engine settings
server.set("view engine", "ejs");
// path of our views
const pathOfviews = path.join(path.resolve(), "src", "views");
server.set("views", pathOfviews);

//setting layout
server.use(ejsLayouts);

// server.use((req, res, next) => {
//   console.log(req.path);
//   next();
// });

const userController = new UserController();
server.get("/register", userController.getRegister);
server.get("/login", userController.getLogin);
server.post("/register", userController.postRegister);
server.post("/login", userController.postLogin);
server.get("/logout", userController.logout);

const productController = new ProductController();

server.get("/", auth, setLastVisit, productController.getProducts);
server.get("/new", auth, productController.getAddForm);
//Handling post request for adding new product
server.post(
  "/",
  auth,
  uploadFile.single("imageUrl"),
  validateRequest,
  productController.addNewProduct
);
//Handle request for getting the view to update the product
server.get("/update-product/:id", auth, productController.getUpdateProductView);
//Handle request for updating the product
server.post("/update-product/", auth, productController.postUpdateProduct);
//Handle reqeust for deleting the product
server.post("/delete-product/:id", auth, productController.deleteProduct);

server.use(express.static("src/views"));
server.use(express.static("public"));
server.listen(port, () => console.log(`server started at ${port} 3500`));
