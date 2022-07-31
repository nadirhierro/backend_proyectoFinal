import daoFactory from "../../containers/daos/index.js";
import Orders from "../../../models/defaultModels/orders/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

export default class apiOrders {
  constructor() {
    this.db = factory.createOrdersDaoDB();
    this.logger = Logger.getInstance();
  }

  getValidation(order, required) {
    try {
      Orders.validate(order, required);
    } catch (err) {
      this.logger.logWrongData(err.details[0].message);
      throw new Error(err.details[0].message);
    }
  }

  async getOrders() {
    try {
      let orders = await this.db.getAll();
      return orders;
    } catch (err) {
      throw err;
    }
  }

  async saveOrder(order) {
    try {
      this.getValidation(order, true);
      let saved = await this.db.save(order);
      return saved;
    } catch (err) {
      throw err;
    }
  }
}
