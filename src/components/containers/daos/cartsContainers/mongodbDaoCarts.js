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
}
