import express from "express";
import ProductsController from "../../../components/controllers/products/index.js";

let { Router } = express;

let routerProducts = new Router();

let products = new ProductsController();

routerProducts.get("/", products.getAllProducts);
routerProducts.get("/:id", products.getProductById);
routerProducts.get("/category/:categoryid", products.getProductsByCategory);
routerProducts.post("/", products.saveProduct);
routerProducts.put("/:id", products.changeProduct);
routerProducts.delete("/", products.deleteAllProducts);
routerProducts.delete("/:id", products.deleteProductById);

export default routerProducts;
