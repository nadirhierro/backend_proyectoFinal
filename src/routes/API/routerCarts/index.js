import express from "express";
import CartsController from "../../../components/controllers/carts/api/index.js";
import apiAuthenticator from "../../../utils/authenticate/index.js";

const { Router } = express;

let authenticator = apiAuthenticator.getInstance();

let routerCarts = new Router();

let carts = new CartsController();

routerCarts.get("/", carts.getAllCarts);
routerCarts.get("/:id", carts.getCartById);
routerCarts.get("/user/get", authenticator.isUser, carts.userGetCart);
routerCarts.post("/", authenticator.isAdmin, carts.saveCart);
routerCarts.post("/user", authenticator.isUser, carts.userCreateCart);
routerCarts.put("/:id", authenticator.isUser, carts.changeCartById);
routerCarts.put(
  "/:id/products/:productId",
  authenticator.isUser,
  carts.addProduct
);
routerCarts.delete(
  "/:id/products/:productId",
  authenticator.isUser,
  carts.deleteProduct
);
routerCarts.delete("/", authenticator.isUser, carts.deleteAll);
routerCarts.delete("/:id", authenticator.isAdmin, carts.deleteById);

export default routerCarts;
