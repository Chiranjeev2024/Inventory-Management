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
    return res.render("products.ejs", { products: productArray });
  }
  getAddForm(req, res) {
    res.render("add-product", { errorMessage: null });
  }
  addNewProduct(req, res) {
    //data validation
    const { name, price, desc, imageUrl } = req.body;
    let errors = [];
    if (!name || name.trim() == "") {
      // if name is undefined or null or empty | .trim() method removes space from beginning and end of the string
      errors.push("a valid name is required ");
    }
    if (!price || parseFloat(price) < 1) {
      errors.push("Price must be a greater than 0");
    }
    //For checking URL we can use URL() parser which is in-built feature of JS
    //If the string passed to this parser is not a valid URL then it throws error
    try {
      const validURL = new URL(imageUrl);
    } catch (err) {
      errors.push("URL is not valid");
    }

    //If we even one error is found we will render the form page with errorMessage
    if (errors.length > 0) {
      //We are sending only the first error message to the view
      return res.render("add-product", { errorMessage: errors[0] });
    }

    //accessing the form data
    console.log(req.body);
    ProductModel.add(req.body);
    //Moving back to the products page when the product is added
    res.render("products", { products: productArray });
  }
}
