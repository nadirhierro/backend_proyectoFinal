import apiCarts from "../../services/carts/index.js";

let service = new apiCarts();

export default class CartsController {
  constructor() {}

  async getAllCarts(req, res, next) {
    try {
      let carts = await service.getAllCarts();
      res.json(carts);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async getCartById(req, res, next) {
    try {
      let id = req.params.id;
      let cart = await service.getCartById(id);
      if (cart) {
        res.json(cart);
      } else {
        res.json({ message: `Cart with id ${id} not found` });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  async saveCart(req, res, next) {
    try {
      let user = await req.user;
      let products = req.body;
      let cart = {
        email: user.email,
        products: products,
        address: user.address,
      };
      let saved = await service.saveCart(cart);
      res.json({ cart: saved });
    } catch (err) {
      res.json({ error: err });
    }
  }

  async changeCartById(req, res, next) {
    try {
      let id = req.params.id;
      let cart = { _id: id, ...req.body };
      let changed = await service.changeCart(cart);
      if (changed) {
        res.json({ cart: changed });
      } else {
        res.json({ error: `Cart with id ${id} not found` });
      }
    } catch (err) {
      res.json({ error: err });
    }
  }

  async deleteById(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await service.deleteCart(id);
      if (deleted) {
        res.json({ cartId: id, status: "deleted" });
      } else {
        res.json({ error: `Cart with id ${id} not found` });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  }

  async deleteAll(req, res, next) {
    try {
      let deleteAll = await service.deleteAll();
      res.json({ deleted: deleteAll });
    } catch (err) {
      res.json({ error: err });
    }
  }
}
