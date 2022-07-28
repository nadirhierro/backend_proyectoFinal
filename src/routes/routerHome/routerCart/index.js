import express from "express";
import CartViewController from "../../../components/controllers/carts/views/index.js";

let { Router } = express;

let routerCart = new Router();

let service = new CartViewController();

routerCart.get("/", service.getCart);

export default routerCart;
