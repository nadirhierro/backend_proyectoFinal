import apiCarts from "../../services/carts/index.js";

let service = new apiCarts();

export default class CartsController {
  constructor() {}

  async getAllCarts(req, res, next) {
    try {
      let carts = await service.getAllCarts();
      res.status(200).json(carts);
    } catch (err) {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async getCartById(req, res, next) {
    try {
      let id = req.params.id;
      let cart = await service.getCartById(id);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(200).json({ message: `Cart with id ${id} not found` });
      }
    } catch (err) {
      res.status(500).json({ err: "Internal Server error" });
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
      if (err.name == "ValidationError") {
        res.status(400).json({ error: err.details[0].message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async changeCartById(req, res, next) {
    try {
      let id = req.params.id;
      let changed = await service.changeCart(id, req.body);
      if (changed) {
        res.status(200).json({ cart: changed });
      } else {
        res.status(200).json({ message: `Cart with id ${id} not found` });
      }
    } catch (err) {
      if (err.name == "ValidationError") {
        res.status(400).json({ error: err.details[0].message });
      } else {
        res.status(500).json({ error: "Internal Server Error" });
      }
    }
  }

  async deleteById(req, res, next) {
    try {
      let id = req.params.id;
      let deleted = await service.deleteCart(id);
      if (deleted) {
        res.status(200).json({ cartId: id, status: "deleted" });
      } else {
        res.status(200).json({ message: `Cart with id ${id} not found` });
      }
    } catch (err) {
      console.log(err);
      res.json({ error: err });
    }
  }

  async deleteAll(req, res, next) {
    try {
      let deleteAll = await service.deleteAll();
      res.status(200).json({ deleted: deleteAll });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
}
