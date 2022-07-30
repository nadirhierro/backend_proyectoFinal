import { passport } from "../../../services/passport/index.js";
import { upload } from "../../../utils/multer/index.js";

export default class AuthController {
  constructor() {}

  isAuth(req, res, next) {
    if (req.isAuthenticated()) {
      next();
    } else {
      res.status(401).redirect("/index");
    }
  }

  isntAuth(req, res, next) {
    if (!req.isAuthenticated()) {
      next();
    } else {
      res.status(200).redirect("/products");
    }
  }

  redirectIndex(req, res, next) {
    res.status(200).redirect("/index");
  }

  renderIndex(req, res, next) {
    res.status(200).render("index");
  }

  renderLogin(req, res, next) {
    res.status(200).render("login");
  }

  renderSignup(req, res, next) {
    res.status(200).render("signup");
  }

  async makeLogout(req, res, next) {
    try {
      let user = await req.user;
      req.session.destroy((err) => {
        if (!err) {
          res.status(200).render("logout", { name: user.name });
        } else {
          res.status(500).render("failLogout", { error: err });
        }
      });
    } catch (err) {
      res.status(500).render("failLogout", { error: err });
    }
  }

  makeLogin(req, res, next) {
    passport.authenticate("login", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) return res.render("faillogin", { message: info.message });
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).redirect("/products");
      });
    })(req, res, next);
  }

  makeSignup(req, res, next) {
    passport.authenticate("signup", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user) return res.render("failsignup", { message: info.message });
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).redirect("/products");
      });
    })(req, res, next);
  }

  uploadAvatar() {
    upload.single("avatar");
  }
}
