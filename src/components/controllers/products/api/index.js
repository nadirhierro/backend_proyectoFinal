import apiProducts from "../../../services/products/index.js";

let service = apiProducts.getInstance();

export default class ProductsController {
  constructor() {}

  async getAllProducts(req, res, next) {
    try {
      let products = await service.getProducts();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getProductsByCategory(req, res, next) {
    try {
      let category = req.params.categoryId;
      let products = await service.getProductsByCategory(category);
      if (products.length > 0) {
        res.status(200).json(products);
      } else {
        res
          .status(200)
          .json({ message: `No products for category ${category}` });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async getProductById(req, res, next) {
    try {
      let id = req.params.id;
      let product = await service.getProductById(id);
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(200).json({ message: `Product with id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async saveProduct(req, res, next) {
    try {
      let product = req.body;
      let saved = await service.saveProduct(product);
      res.status(200).json(saved);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async changeProduct(req, res, next) {
    try {
      let id = req.params.id;
      let changed = await service.changeProduct(id, req.body);
      res.status(200).json(changed);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async deleteProductById(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await service.deleteProductById(id);
      if (deleted) {
        res.status(200).json(deleted);
      } else {
        res.status(200).json({ message: `Product with id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async deleteAllProducts(req, res, next) {
    try {
      let deleted = await service.deleteAllProducts();
      res.status(200).json(deleted);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
    }
  }
}
