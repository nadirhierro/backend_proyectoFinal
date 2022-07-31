import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoMessages extends fileContainer {
  constructor() {
    super();
    this.fileName = "./src/data/messages.json";
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
      return filteredByEmail;
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
