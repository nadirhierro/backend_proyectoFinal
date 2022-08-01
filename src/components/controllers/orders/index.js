import apiOrders from "../../services/orders/index.js";
import mailService from "../../../services/mailer/index.js";

let service = new apiOrders();
let mailer = new mailService();

export default class OrdersController {
  constructor() {}

  async getOrders(req, res, next) {
    try {
      let orders = await service.getOrders();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json({ error: err });
    }
  }

  async saveOrder(req, res, next) {
    try {
      let user = await req.user;
      let order = req.body;
      let orderFinal = {...order, state:"generated"};
      let saved = await service.saveOrder(orderFinal);
      if (saved) {
        let mailToUser = await mailer.newOrder(user, products);
        let mailToAdmin = await mailer.newOrderToAdmin(user, products);
      }
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
}
