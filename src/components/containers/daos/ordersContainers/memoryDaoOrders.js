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
  
  async saveOrder(order){
    try {
      let finalOrder = {...order, state: "generated"};
      let saved = await this.save(finalOrder);
      return saved;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
