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

  async getMessagesByEmail(email) {
    try {
      let all = await this.getAll();
      let filteredByEmail = all.filter((message) => (message.email = email));
      if (filteredByEmail.length > 0) {
        return filteredByEmail;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw err;
    }
  }
}
