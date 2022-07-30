import express from "express";
import CartsController from "../../../components/controllers/carts/api/index.js";

const { Router } = express;

let routerCarts = new Router();

let carts = new CartsController();

routerCarts.get("/", carts.getAllCarts);
routerCarts.get("/:id", carts.getCartById);
routerCarts.get("/user/get", carts.userGetCart);
routerCarts.post("/", carts.saveCart);
routerCarts.put("/:id", carts.changeCartById);
routerCarts.put("/:id/products/:productId", carts.addProduct);
routerCarts.delete("/:id/products/:productId", carts.deleteProduct);
routerCarts.delete("/", carts.deleteAll);
routerCarts.delete("/:id", carts.deleteById);

export default routerCarts;
