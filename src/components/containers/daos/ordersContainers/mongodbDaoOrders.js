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
}
