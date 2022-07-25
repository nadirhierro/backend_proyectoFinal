import daoFactory from "../../containers/daos/index.js";
import Products from "../../../models/defaultModels/products/index.js";

let factory = new daoFactory();

export default class apiProducts {
  constructor() {
    this.db = factory.createProductsDaoDB();
  }

  getValidation(product, required) {
    try {
      Products.validate(product, required);
    } catch (err) {
      throw new Error(
        "El mensaje posee un formato inválido o falta información" +
          err.details[0].message
      );
    }
  }

  async getProducts() {
    try {
      let all = await this.db.getAll();
      console.log(all);
      return all;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductsByCategory(category) {
    try {
      let products = await this.db.getProductsByCategory(category);
      return products;
    } catch (err) {
      console.log(err);
    }
  }

  async getProductById(id) {
    try {
      let product = await this.db.getById(id);
      return product;
    } catch (err) {
      console.log(err);
    }
  }

  async saveProduct(product) {
    try {
      this.getValidation(procut, true);
      let saved = await this.db.save(product);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }

  async changeProduct(product) {
    try {
      this.getValidation(product, false);
      let changed = await this.db.change(product);
      return changed;
    } catch (err) {
      console.log(err);
    }
  }

  async deleteProductById(id) {
    try {
      let deleted = await this.db.deleteById(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
