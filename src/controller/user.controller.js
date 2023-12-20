import UserModel from "../model/user.model.js";

export default class UserController {
  getRegister(req, res) {
    res.render("register");
  }
  getLogin(req, res) {
    res.render("login", {
      errorMessage: null,
    });
  }
}
