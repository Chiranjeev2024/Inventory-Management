//import path from "path"; //core module
import ProductModel from "../model/product.model.js";
let productArray = ProductModel.get();
export default class ProductController {
  getProducts(req, res) {
    //console.log(productArray);
    //In sendFile we need to pass the path of the file
    //We will generate file path using path module
    //path.resolve() gives the path of the current directory - of the file which is
    //being executed usnig node command
    //path.join () takes the segments of the path and joins them according to the platfrom
    // const pathOfFile = path.join(
    //   path.resolve(),
    //   "src",
    //   "views",
    //   "products.html"
    // );
    // return res.sendFile(pathOfFile); //.sendFile () comes from express to the res obejct
    return res.render("products.ejs", {
      products: productArray,
      userEmail: req.session.userEmail,
    });
  }
  getAddForm(req, res) {
    res.render("add-product", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  addNewProduct(req, res) {
    //accessing the form data
    const imageUrl = "/images/" + req.file.filename;
    // console.log({ ...req.body, imageUrl });
    ProductModel.add({ ...req.body, imageUrl });
    //Moving back to the products page when the product is added
    // res.render("products", {
    //   products: products,
    //   userEmail: req.session.userEmail,
    // });
    res.redirect("/");
  }
  getUpdateProductView(req, res, next) {
    //1. If Product exists then return view
    const { id } = req.params;
    const productFound = ProductModel.getById(id);
    //console.log(req.params);
    if (productFound) {
      res.render("update-product", {
        product: productFound,
        errorMessage: null,
        userEmail: req.session.userEmail,
      });
    }
    //2. Else return errors.
    else {
      res.status(401).send("Product Not Found");
    }
  }
  postUpdateProduct(req, res, next) {
    //console.log(req.body);
    ProductModel.update(req.body);

    //Moving back to the products page when the product is added
    res.render("products", { products: productArray });
    //res.redirect("/");
  }
  deleteProduct(req, res, next) {
    //Handling the case if product do not exists
    const productFound = ProductModel.getById(req.params.id);
    //console.log(req.params);
    if (!productFound) {
      res.status(401).send("Product Not Found");
    }
    ProductModel.delete(req.params.id);
    //res.render("products", { products: productArray });
    res.redirect("/");
  }
}
