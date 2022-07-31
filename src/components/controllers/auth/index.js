import { passport } from "../../../services/passport/index.js";

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
    res.status(200).render("pages/index");
  }

  renderLogin(req, res, next) {
    res.status(200).render("pages/login");
  }

  renderSignup(req, res, next) {
    res.status(200).render("pages/signup");
  }

  async makeLogout(req, res, next) {
    try {
      let user = await req.user;
      req.session.destroy((err) => {
        if (!err) {
          res.status(200).render("pages/logout", { name: user.name });
        } else {
          res.status(500).render("pages/fails/failLogout", { message: err });
        }
      });
    } catch (err) {
      res.status(500).render("pages/fails/failLogout", { message: err });
    }
  }

  makeLogin(req, res, next) {
    passport.authenticate("login", function (err, user, info) {
      if (err) {
        return next(err);
      }
      if (!user)
        return res.render("pages/fails/faillogin", { message: info.message });
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
      if (!user)
        return res.render("pages/fails/failsignup", { message: info.message });
      req.login(user, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).redirect("/products");
      });
    })(req, res, next);
  }
}
