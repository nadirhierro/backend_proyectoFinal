import express from "express";
import routerProducts from "./routerProducts/index.js";
import routerCart from "./routerCart/index.js";
import routerChat from "./routerChat/index.js";
import AuthController from "../../components/controllers/auth/index.js";

const { Router } = express;

let auth = new AuthController();

let routerHome = new Router();

routerHome.get("/login", auth.isntAuth, auth.renderLogin);

routerHome.get("/signup", auth.isntAuth, auth.renderSignup);

routerHome.get("/", auth.isAuth, auth.redirectIndex);

routerHome.get("/index", auth.isntAuth, auth.renderIndex);

routerHome.post("/login", auth.makeLogin);

routerHome.get("/logout", auth.makeLogout);

routerHome.post("/signup", auth.uploadAvatar, auth.makeSignup);

routerHome.use("/products", auth.isAuth, routerProducts);

routerHome.use("/cart", auth.isAuth, routerCart);

routerHome.use("/chat", auth.isAuth, routerChat);

export default routerHome;
