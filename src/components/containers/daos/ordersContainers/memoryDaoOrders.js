import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class memoryDaoOrders extends memoryContainer {
  constructor() {
    super();
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new memoryDaoOrders();
    }
    return instance;
  }
}
