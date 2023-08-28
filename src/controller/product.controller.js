import path from "path"; //core module
import ProductModel from "../model/product.model.js";
export default class ProductController {
  getProducts(req, res) {
    let productArray = ProductModel.get();
    console.log(productArray);
    //In sendFile we need to pass the path of the file
    //We will generate file path using path module
    //path.resolve() gives the path of the current directory - of the file which is
    //being executed usnig node command
    //path.join () takes the segments of the path and joins them according to the platfrom
    const pathOfFile = path.join(
      path.resolve(),
      "src",
      "views",
      "products.html"
    );
    // return res.sendFile(pathOfFile); //.sendFile () comes from express to the res obejct
    return res.render("products.ejs", { products: productArray });
  }
}
