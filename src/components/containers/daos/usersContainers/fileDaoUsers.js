import fileContainer from "../../fileContainer.js";

let instance = null;

export default class fileDaoUsers extends fileContainer {
  constructor() {
    super();
    this.fileName = "./data/users.json";
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new fileDaoUsers();
    }
    return instance;
  }

  async getUserByEmail(email) {
    try {
      let users = await this.getAll();
      let user = users.find((user) => (user.email = email));
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      this.logger.logDatabaseError(err);
      throw new Error("Database Error");
    }
  }
}
