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

  async userGetCart(req, res, next) {
    try {
      let user = await req.user;
      let cart = await service.getCartByEmail(user.email);
      res.status(200).json(cart);
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
      let cart = {
        email: req.body.email,
        products: req.body.products,
        address: req.body.address,
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

  async userCreateCart(req, res, next) {
    try {
      let user = await req.user;
      let cart = {
        email: user.email,
        products: [],
        address: user.address,
      };
      let saved = await service.saveCart(cart);
      res.status(200).json(saved);
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
    }
  }

  async addProduct(req, res, next) {
    try {
      let cartId = req.params.id;
      let productId = req.params.productId;
      let quantity = req.query.quantity;
      let added = await service.addProduct(cartId, productId, quantity);
      res.status(200).json({ added });
    } catch (err) {
      if (err.message.indexOf("Database error") > -1) {
        res.status(500);
      } else {
        res.status(400);
      }
      res.json({ error: err.message });
    }
  }

  async deleteProduct(req, res, next) {
    try {
      let cartId = req.params.id;
      let productId = req.params.productId;
      let deleted = await service.deleteProduct(cartId, productId);
      res.status(200).json({ status: deleted });
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
