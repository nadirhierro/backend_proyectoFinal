import express from "express";
import AuthController from "../../components/controllers/auth/index.js";

const { Router } = express;

let auth = new AuthController();

let routerHome = new Router();

routerHome.get("/login", auth.goLogin);

routerHome.get("/signup", auth.goSignUp);

routerHome.get("/", auth.isAuth, auth.goIndex);

routerHome.post("/login", auth.makeLogin);

routerHome.get("/logout", auth.makeLogout);

routerHome.post("/signup", auth.uploadAvatar, auth.makeSignup);

routerHome.get("/home", auth.isAuth, auth.goHome);

export default routerHome;
