import daoFactory from "../../containers/daos/index.js";
import Products from "../../../models/defaultModels/products/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

export default class apiProducts {
  constructor() {
    this.db = factory.createProductsDaoDB();
    this.logger = Logger.getInstance();
  }

  getValidation(product, required) {
    try {
      Products.validate(product, required);
    } catch (err) {
      this.logger.logWrongData(err.details[0].message);
      throw err.details[0].message;
    }
  }

  async getProducts() {
    try {
      let all = await this.db.getAll();
      return all;
    } catch (err) {
      throw err;
    }
  }

  async getProductsByCategory(category) {
    try {
      let products = await this.db.getProductsByCategory(category);
      return products;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      let product = await this.db.getById(id);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async saveProduct(product) {
    try {
      this.getValidation(procut, true);
      let saved = await this.db.save(product);
      return saved;
    } catch (err) {
      throw err;
    }
  }

  async changeProduct(product) {
    try {
      this.getValidation(product, false);
      let changed = await this.db.change(product);
      return changed;
    } catch (err) {
      throw err;
    }
  }

  async deleteProductById(id) {
    try {
      let deleted = await this.db.deleteById(id);
      return deleted;
    } catch (err) {
      throw err;
    }
  }
}
