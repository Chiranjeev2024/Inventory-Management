import { body, validationResult } from "express-validator";
export const validateRequest = async (req, res, next) => {
 // console.log("validator called");

  //1. Steup rule for validation using express-validator
  const rules = [
    //For validating name we will use isEmpty method
    body("name").notEmpty().withMessage("Name is required"),
    //For validating price we using isFloat method, in which we pass rule as
    //gt: 0 where "gt" stands for greater than
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price should be greater than 0"),
    // body("imageUrl").isURL().withMessage("Invalid URL"),
    body("imageUrl").custom((value, { req }) => {
      if (!req.file) {
        // if file is empty
        throw new Error("Image is required");
      }
      return true;
    }),
  ];

  //2. Running the rules
  //.all method takes an array of promies and runs them all
  //Every rule have run function and it takes request object as parameter
  await Promise.all(rules.map((rule) => rule.run(req)));

  //3. Checking for errors
  let validationError = validationResult(req);

  //If we even one error is found we will render the form page with errorMessage
  if (!validationError.isEmpty()) {
    //We are sending only the first error message to the view
    return res.render("add-product", {
      //validationError is an object returned by the validationResult
      errorMessage: validationError.array()[0].msg,
    });
    //return keyword is used here show that code below do not executes
  }

  //calling next middleware in the pipeline
  next();
};
