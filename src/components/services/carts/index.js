import daoFactory from "../../containers/daos/index.js";
import Carts from "../../../models/defaultModels/carts/index.js";
import apiProducts from "../products/index.js";
import isValidObjectId from "../../../models/defaultModels/ObjectID/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

let products = apiProducts.getInstance();

let instance = null;

export default class apiCarts {
  constructor() {
    this.db = factory.createCartsDaoDB();
    this.logger = Logger.getInstance();
  }

  static getInstance() {
    if (!instance) {
      instance = new apiCarts();
    }
    return instance;
  }

  getValidation(cart, required) {
    try {
      Carts.validate(cart, required);
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
      this.getValidationId(id);
      let cart = await this.db.getById(id);
      return cart;
    } catch (err) {
      throw err;
    }
  }

  async getCartByEmail(email) {
    try {
      let cart = await this.db.getCartByEmail(email);
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

  async changeCart(id, cart) {
    try {
      this.getValidationId(id);
      this.getValidation(cart, false);
      let changed = await this.db.change(id, cart);
      return changed;
    } catch (err) {
      throw err;
    }
  }

  async addProduct(cartId, productId, quantity) {
    try {
      this.getValidationId(cartId);
      this.getValidationId(productId);
      let cart = await this.getCartById(cartId);
      let product = await products.getById(productId);
      if (!cart || !product) return false;
      if (!cart.products.find((product) => product._id == productId)) {
        cart.products.push({
          _id: product._id,
          name: product.name,
          price: product.price,
          quantity: quantity,
        });
        let changed = await this.changeCart(cartId, {
          products: cart.products,
        });
        return changed;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteProduct(cartId, productId) {
    try {
      this.getValidationId(cartId);
      this.getValidationId(productId);
      let cart = await this.getCartById(cartId);
      if (!cart) return false;
      let product = cart.products.find((product) => product._id == productId);
      if (product) {
        let index = cart.products.indexOf(product);
        cart.products.splice(index, 1);
        let changed = await this.changeCart(cartId, {
          products: cart.products,
        });
        return changed;
      } else {
        return false;
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteCart(id) {
    try {
      this.getValidationId(id);
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
