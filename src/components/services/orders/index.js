import daoFactory from "../../containers/daos/index.js";
import Orders from "../../../models/defaultModels/orders/index.js";

let factory = new daoFactory();

export default class apiOrders {
  constructor() {
    this.db = factory.createOrdersDaoDB();
  }

  static getValidation(order, required) {
    try {
      Orders.validate(order, required);
    } catch (err) {
      throw new Error(
        "El mensaje posee un formato inválido o falta información" +
          err.details[0].message
      );
    }
  }

  async getOrders() {
    try {
      let orders = await this.db.getAll();
      return orders;
    } catch (err) {
      console.log(err);
    }
  }

  async saveOrder(order) {
    try {
      this.getValidation(order, required);
      let saved = await this.db.save(order);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
