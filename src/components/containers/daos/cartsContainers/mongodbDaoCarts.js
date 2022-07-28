import mongodbContainer from "../../mongodbContainer.js";
import { cartModel } from "../../../../models/mongodb/index.js";

let instance = null;

export default class mongodbDaoCarts extends mongodbContainer {
  constructor() {
    super();
    this.model = cartModel;
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new mongodbDaoCarts();
    }
    return instance;
  }

  async getCartByEmail(email) {
    try {
      let cart = await this.model.findOne({ email: email });
      if (cart) {
        return cart.toObject();
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
