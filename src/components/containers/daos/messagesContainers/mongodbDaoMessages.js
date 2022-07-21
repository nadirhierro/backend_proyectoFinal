import mongodbContainer from "../../mongodbContainer.js";
import { messageModel } from "../../../../models/mongodb/index.js";

let instance = null;

export default class mongodbDaoMessages extends mongodbContainer {
  constructor() {
    super();
    this.model = messageModel;
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new mongodbDaoMessages();
    }
    return instance;
  }
}
