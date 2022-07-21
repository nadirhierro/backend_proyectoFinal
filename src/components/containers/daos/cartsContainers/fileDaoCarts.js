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
}
