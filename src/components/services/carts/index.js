import daoFactory from "../../containers/daos/index.js";
import Carts from "../../../models/defaultModels/carts/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

export default class apiCarts {
  constructor() {
    this.db = factory.createCartsDaoDB();
    this.logger = Logger.getInstance();
  }

  getValidation(cart, required) {
    try {
      Carts.validate(cart, required);
    } catch (err) {
      this.logger.logWrongData(err.details[0].message);
      throw err.details[0].message;
    }
  }

  async getAllCarts() {
    try {
      let carts = await this.db.getAll();
      return carts;
    } catch (err) {
      throw err;
    }
  }

  async getCartById(id) {
    try {
      let cart = await this.db.getById(id);
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async saveCart(cart) {
    try {
      this.getValidation(cart, true);
      let saved = await this.db.save(cart);
      return saved;
    } catch (err) {
      throw err;
    }
  }

  async changeCart(cart) {
    try {
      this.getValidation(cart, false);
      let changed = await this.db.change(cart);
      return changed;
    } catch (err) {
      throw err;
    }
  }

  async deleteCart(id) {
    try {
      let deleted = await this.db.deleteById(id);
      return deleted;
    } catch (err) {
      throw err;
    }
  }

  async deleteAll() {
    try {
      let deleted = await this.db.deleteAll();
      return deleted;
    } catch (err) {
      throw err;
    }
  }
}
