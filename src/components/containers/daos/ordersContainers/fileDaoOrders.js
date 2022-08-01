import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoOrders extends fileContainer {
  constructor() {
    super();
    this.fileName = "./src/data/orders.json";
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new fileDaoOrders();
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
