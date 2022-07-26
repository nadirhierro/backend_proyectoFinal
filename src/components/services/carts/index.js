import daoFactory from "../../containers/daos/index.js";
import Carts from "../../../models/defaultModels/carts/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

let logger = Logger.getInstance();

export default class apiCarts {
  constructor() {
    this.db = factory.createCartsDaoDB();
  }

  getValidation(cart, required) {
    try {
      Carts.validate(cart, required);
    } catch (err) {
      logger.logWrongData(err.details[0].message);
      throw err.details[0].message;
    }
  }

  async getAllCarts() {
    try {
      let carts = await this.db.getAll();
      return carts;
    } catch (err) {
      console.log("hola");
    }
  }

  async getCartById(id) {
    try {
      let cart = await this.db.getById(id);
      return cart;
    } catch (err) {
      console.log(err);
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
      console.log(err);
    }
  }

  async deleteCart(id) {
    try {
      let deleted = await this.db.deleteById(id);
      return deleted;
    } catch (err) {
      console.log(err);
    }
  }
}
