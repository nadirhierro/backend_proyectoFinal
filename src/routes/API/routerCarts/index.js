import express from "express";
import CartsController from "../../../components/controllers/carts/index.js";

const { Router } = express;

let routerCarts = new Router();

let carts = new CartsController();

routerCarts.get("/", carts.getAllCarts);
routerCarts.get("/:id", carts.getCartById);
routerCarts.post("/", carts.saveCart);
routerCarts.put("/:id", carts.changeCartById);
routerCarts.delete("/", carts.deleteAll);
routerCarts.delete("/:id", carts.deleteById);

export default routerCarts;
