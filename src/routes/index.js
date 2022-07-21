import express from "express";
import routerApi from "./API/index.js";
import routerHome from "./routerHome/index.js";

let { Router } = express;

let router = new Router();

router.use("/api", routerApi);
router.use("/", routerHome);

export default router;
