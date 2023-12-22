import UserModel from "../model/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register", { userEmail: req.session.userEmail });
  }
  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
      userEmail: req.session.userEmail,
    });
  }
  postRegister(req, res) {
    const { name, email, password } = req.body;
    UserModel.add(name, email, password);
    // res.render("login", { errorMessage: null });
    res.redirect("/login");
  }
  postLogin(req, res) {
    //console.log("postLogin called");
    const { email, password } = req.body;
    const user = UserModel.isValid(email, password);
    if (!user) {
      res.render("login", {
        errorMessage: "User with given email and password not found",
        userEmail: req.session.userEmail,
      });
    } else {
      req.session.userEmail = email;
      res.redirect("/");
    }
  }
  logout(req, res) {
    //on logout, destroy the session
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.redirect("/login");
      }
    });
  }
}
