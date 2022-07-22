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
      console.log(err);
    }
  }

  async makeLogout(req, res, next) {
    try {
      let user = await req.user;
      req.session.destroy((err) => {
        if (!err) {
          res.render("logout", { name: user.name });
        } else {
          res.send({ status: "logout ERROR", body: err });
        }
      });
    } catch (err) {
      console.log(err);
    }
  }

  makeLogin(req, res, next) {
    passport.authenticate("login", {
      successRedirect: "home",
      failureRedirect: "faillogin",
    })(req, res, next);
  }

  makeSignup(req, res, next) {
    passport.authenticate("signup", {
      successRedirect: "home",
      failureRedirect: "failsignup",
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
