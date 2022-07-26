import { passport } from "../../../services/passport/index.js";
import { upload } from "../../../utils/multer/index.js";

export default class AuthController {
  constructor() {}

  isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.render("index");
    }
  }

  goIndex(req, res, next) {
    res.redirect("/home");
  }

  goLogin(req, res, next) {
    res.render("login");
  }

  goSignUp(req, res, next) {
    res.render("signup");
  }

  async goHome(req, res, next) {
    try {
      let user = await req.user;
      res.render("home", {
        name: user.name,
        thumbnail: user.avatar,
        email: user.email,
      });
    } catch (err) {
      res.render("error", { error: err });
    }
  }

  async makeLogout(req, res, next) {
    try {
      let user = await req.user;
      req.session.destroy((err) => {
        if (!err) {
          res.render("logout", { name: user.name });
        } else {
          res.render("failLogout", { error: err });
        }
      });
    } catch (err) {
      res.render("failLogout", { error: err });
    }
  }

  makeLogin(req, res, next) {
    passport.authenticate("login", {
      successRedirect: "home",
      failureRedirect: "faillogin",
      failureMessage: true,
    })(req, res, next);
  }

  makeSignup(req, res, next) {
    passport.authenticate("signup", {
      successRedirect: "home",
      failureRedirect: "failsignup",
      failureMessage: true,
    })(req, res, next);
  }

  failLogin(req, res, next) {
    res.render("faillogin");
  }

  failSignup(req, res, next) {
    res.render("failsignup");
  }

  uploadAvatar() {
    upload.single("avatar");
  }
}
