import express from "express";
import ProductsViewController from "../../../components/controllers/products/views/index.js";

let { Router } = express;

let routerProducts = new Router();

let service = new ProductsViewController();

routerProducts.get("/", service.showProducts);
routerProducts.get("/category/:category", service.showProductsByCategory);
routerProducts.get("/:id", service.showProduct);

export default routerProducts;
