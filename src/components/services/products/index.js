import daoFactory from "../../containers/daos/index.js";
import Products from "../../../models/defaultModels/products/index.js";
import isValidObjectId from "../../../models/defaultModels/ObjectID/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

let instance = null;

export default class apiProducts {
  constructor() {
    this.db = factory.createProductsDaoDB();
    this.logger = Logger.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new apiProducts();
    }
    return instance;
  }

  getValidation(product, required) {
    try {
      Products.validate(product, required);
    } catch (err) {
      this.logger.logWrongData(err.details[0].message);
      throw new Error(err.details[0].message);
    }
  }

  getValidationId(id) {
    try {
      isValidObjectId(id);
    } catch (err) {
      this.logger.logWrongData(err.message);
      throw new Error(err.message);
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
      let products = await this.db.getByCategory(category);
      return products;
    } catch (err) {
      throw err;
    }
  }

  async getProductById(id) {
    try {
      this.getValidationId(id);
      let product = await this.db.getById(id);
      return product;
    } catch (err) {
      throw err;
    }
  }

  async saveProduct(product) {
    try {
      this.getValidation(product, true);
      let saved = await this.db.save(product);
      return saved;
    } catch (err) {
      throw err;
    }
  }

  async changeProduct(id, product) {
    try {
      this.getValidationId(id);
      this.getValidation(product, false);
      let changed = await this.db.change(id, product);
      return changed;
    } catch (err) {
      throw err;
    }
  }

  async deleteProductById(id) {
    try {
      this.getValidationId(id);
      let deleted = await this.db.deleteById(id);
      return deleted;
    } catch (err) {
      throw err;
    }
  }

  async deleteAllProducts() {
    try {
      let deleted = await this.db.deleteAll();
      return deleted;
    } catch (err) {
      throw err;
    }
  }
}
