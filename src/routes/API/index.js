import express from "express";
import routerCarts from "./routerCarts/index.js";
import routerMessages from "./routerMessages/index.js";
import routerOrders from "./routerOrders/index.js";
import routerProducts from "./routerProducts/index.js";

let { Router } = express;

let routerApi = new Router();

routerApi.use("/carts", routerCarts);
routerApi.use("/messages", routerMessages);
routerApi.use("/orders", routerOrders);
routerApi.use("/routerProducts", routerProducts);

export default routerApi;
