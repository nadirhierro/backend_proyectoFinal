import express from "express";
import routerApi from "./API/index.js";

let { Router } = express;

let router = new Router();

router.use("/api", routerApi);

export default router;
