import express from "express";
import ProductsController from "../../../components/controllers/products/api/index.js";
import apiAuthenticator from "../../../utils/authenticate/index.js";

let { Router } = express;

let authenticator = apiAuthenticator.getInstance();

let routerProducts = new Router();

let products = new ProductsController();

routerProducts.get("/", products.getAllProducts);
routerProducts.get("/:id", products.getProductById);
routerProducts.get("/category/:categoryId", products.getProductsByCategory);
routerProducts.post("/", authenticator.isAdmin, products.saveProduct);
routerProducts.put("/:id", products.changeProduct);
routerProducts.delete("/", authenticator.isAdmin, products.deleteAllProducts);
routerProducts.delete(
  "/:id",
  authenticator.isAdmin,
  products.deleteProductById
);

export default routerProducts;
