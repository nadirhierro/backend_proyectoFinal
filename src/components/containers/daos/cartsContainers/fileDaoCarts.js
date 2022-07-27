import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoCarts extends fileContainer {
  constructor() {
    super();
    this.fileName = "./data/carts.json";
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new fileDaoCarts();
    }
    return instance;
  }

  async getCartByEmail(email) {
    try {
      let carts = await this.getAll();
      let cart = carts.find((cart) => cart.email == email);
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
