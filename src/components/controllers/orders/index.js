import apiOrders from "../../services/orders/index.js";
import mailService from "../../../services/mailer/index.js";

let service = new apiOrders();
let mailer = new mailService();

export default class OrdersController {
  constructor() {}

  async getOrders(req, res, next) {
    try {
      let orders = await service.getOrders();
      res.json(orders);
    } catch (err) {
      res.json({ error: err });
    }
  }

  async saveOrder(req, res, next) {
    try {
      let user = req.user;
      let products = req.body;
      let order = {
        email: user[0].email,
        state: "in process",
        products: products,
      };
      let saved = await service.saveOrder(order);
      if (saved) {
        let mailToUser = await mailer.newOrder(user, products);
        let mailToAdmin = await mailer.newOrderToAdmin(user, products);
      }
      res.json(saved);
    } catch (err) {
      res.json({ error: err });
    }
  }
}
