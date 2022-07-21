import apiProducts from "../../services/products/index.js";

let service = new apiProducts();

export default class ProductsController {
  constructor() {}

  async getAllProducts(req, res, next) {
    try {
      let products = await service.getProducts();
      res.json(products);
    } catch (err) {
      res.json(err);
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      let { category } = req.params;
      let products = await service.getProductsByCategory(category);
      res.json(products);
    } catch (err) {
      res.json(err);
    }
  }

  async getProductById(req, res, next) {
    try {
      let { id } = req.params;
      let product = await service.getProductById(id);
      res.json(product);
    } catch (err) {
      res.json(err);
    }
  }

  async saveProduct(req, res, next) {
    try {
      let product = req.body;
      let saved = await service.saveProduct(product);
      res.json(saved);
    } catch (err) {
      res.json(err);
    }
  }

  async changeProduct(req, res, next) {
    try {
      let { id } = req.params;
      let data = req.body;
      let product = { id, ...data };
      let changed = await service.changeProduct(product);
      res.json(changed);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      let { id } = req.params;
      let deleted = await service.deleteProductById(id);
      res.json(deleted);
    } catch (err) {
      res.json(err);
    }
  }

  async deleteAllProducts(req, res, next) {
    try {
      let deleted = await service.deleteAllProducts();
      res.json(deleted);
    } catch (err) {
      res.json(err);
    }
  }
}
