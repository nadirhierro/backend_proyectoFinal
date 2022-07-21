import express from "express";
import OrdersController from "../../../components/controllers/orders/index.js";

let { Router } = express;

let routerOrders = new Router();

let orders = new OrdersController();

routerOrders.get("/", orders.getOrders);
routerOrders.post("/", orders.saveOrder);

export default routerOrders;
