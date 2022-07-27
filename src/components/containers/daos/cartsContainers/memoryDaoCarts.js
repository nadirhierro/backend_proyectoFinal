import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class memoryDaoCarts extends memoryContainer {
  constructor() {
    super();
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new memoryDaoCarts();
    }
    return instance;
  }

  async getCartByEmail(email) {
    try {
      let cart = await this.container.find({ email: email });
      if (cart) {
        return cart;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
