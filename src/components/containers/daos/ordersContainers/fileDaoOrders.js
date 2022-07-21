import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoOrders extends fileContainer {
  constructor() {
    super();
    this.fileName = "./data/orders.json";
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new fileDaoOrders();
    }
    return instance;
  }
}
