import apiCarts from "../../../services/carts/index.js";

let service = apiCarts.getInstance();

export default class CartsController {
  constructor() {}

  async getAllCarts(req, res, next) {
    try {
      let carts = await service.getAllCarts();
      res.status(200).json(carts);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
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
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
    }
  }

  async getCartByEmail(req, res, next) {
    try {
      let email = req.params.email;
      let cart = await service.getCartByEmail(email);
      if (cart) {
        res.status(200).json(cart);
      } else {
        res.status(200).json({ message: `Cart with id ${id} not found` });
      }
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
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
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
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
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
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
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
    }
  }

  async deleteAll(req, res, next) {
    try {
      let deleteAll = await service.deleteAll();
      res.status(200).json({ deleted: deleteAll });
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
