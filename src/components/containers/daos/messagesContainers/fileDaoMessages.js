import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoMessages extends fileContainer {
  constructor() {
    super();
    this.fileName = "./data/messages.json";
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new fileDaoMessages();
    }
    return instance;
  }
}
