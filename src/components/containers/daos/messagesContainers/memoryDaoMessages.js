import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class memoryDaoMessages extends memoryContainer {
  constructor() {
    super();
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new memoryDaoMessages();
    }
    return instance;
  }

  async getMessagesByEmail(email) {
    let all = this.getAll();
    let filteredByEmail = all.filter((message) => (message.email = email));
    return filteredByEmail;
  }
}
