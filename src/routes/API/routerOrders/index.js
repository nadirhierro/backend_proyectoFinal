import express from "express";
import OrdersController from "../../../components/controllers/orders/index.js";
import apiAuthenticator from "../../../utils/authenticate/index.js";

let { Router } = express;

let authenticator = apiAuthenticator.getInstance();

let routerOrders = new Router();

let orders = new OrdersController();

routerOrders.get("/", orders.getOrders);
routerOrders.post("/", authenticator.isUser, orders.saveOrder);

export default routerOrders;
