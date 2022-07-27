import apiProducts from "../../services/products/index.js";

let service = new apiProducts();

export default class ProductsController {
  constructor() {}

  async getAllProducts(req, res, next) {
    try {
      let products = await service.getProducts();
      res.json(products);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      let category = req.params.categoryId;
      let products = await service.getProductsByCategory(category);
      res.json(products);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async getProductById(req, res, next) {
    try {
      let id = req.params.id;
      let product = await service.getProductById(id);
      res.json(product);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async saveProduct(req, res, next) {
    try {
      let product = req.body;
      let saved = await service.saveProduct(product);
      res.json(saved);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async changeProduct(req, res, next) {
    try {
      let id = req.params.id;
      let changed = await service.changeProduct(id, req.body);
      res.json(changed);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async deleteProductById(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await service.deleteProductById(id);
      if (deleted) {
        res.json(deleted);
      } else {
        res.json({ error: `Product with id ${id} not found` });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  async deleteAllProducts(req, res, next) {
    try {
      let deleted = await service.deleteAllProducts();
      res.json(deleted);
    } catch (err) {
      res.json({ error: err });
    }
  }
}
