import memoryContainer from "../../memoryContainer.js";

let instance = null;

export default class memoryDaoUsers extends memoryContainer {
  constructor() {
    super();
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new memoryDaoUsers();
    }
    return instance;
  }

  getUserByEmail(email) {
    try {
      let user = this.container.find((user) => user.email == email);
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
