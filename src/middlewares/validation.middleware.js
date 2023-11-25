export const validateRequest = (req, res, next) => {
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
    //return keyword is used here show that code below do not executes
  }
  //calling next middleware in the pipeline
  next();
};
