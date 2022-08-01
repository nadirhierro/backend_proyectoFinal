import mongodbContainer from "../../mongodbContainer.js";
import { orderModel } from "../../../../models/mongodb/index.js";

let instance = null;

export default class mongodbDaoOrders extends mongodbContainer {
  constructor() {
    super();
    this.model = orderModel;
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new mongodbDaoOrders();
    }
    return instance;
  }
  
  async saveOrder(order){
    try {
      let finalOrder = {...order, status: "generated"};
      let saved = await this.save(finalOrder);
      return saved;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
