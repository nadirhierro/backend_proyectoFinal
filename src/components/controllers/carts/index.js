import apiCarts from "../../services/carts/index.js";

let service = new apiCarts();

export default class CartsController {
  constructor() {}

  async saveCart(req, res, next) {
    try {
      let user = await req.user;
      let products = req.body;
      let cart = {
        email: user[0].email,
        products: products,
        address: user[0].address,
      };
      let saved = await service.saveCart(cart);
      if (saved) {
        res.json({ cart: create, email: user[0].name });
      } else {
        res.json({ error: saved });
      }
    } catch (err) {
      res.json(err);
    }
  }

  async changeCartById(req, res, next) {
    try {
      let { id } = req.params;
      let cart = { _id: id, ...req.body };
      let changed = await service.changeCart(cart);
      if (changed) {
        res.json({ cart: changed });
      } else {
        res.json({ error: changed });
      }
    } catch (err) {
      res.json(err);
    }
  }

  async deleteById(req, res, next) {
    try {
      let { id } = req.params;
      let deleted = await service.deleteById(id);
      if (deleted) {
        res.json({ cartId: id, status: "deleted" });
      } else {
        res.json({ error: deleted });
      }
    } catch (err) {
      res.json(err);
    }
  }

  async deleteAll(req, res, next) {
    try {
      let deleteAll = await service.deleteAll();
      res.json({ deleted: deleteAll });
    } catch (err) {
      res.json(err);
    }
  }
}
