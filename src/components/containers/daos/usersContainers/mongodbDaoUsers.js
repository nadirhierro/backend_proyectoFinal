import mongodbContainer from "../../mongodbContainer.js";
import { userModel } from "../../../../models/mongodb/index.js";

let instance = null;

export default class mongodbDaoUsers extends mongodbContainer {
  constructor(model) {
    super(model);
    this.model = userModel;
  }

  // Método para devolver instancia una sola vez
  static getInstance() {
    if (!instance) {
      instance = new mongodbDaoUsers();
    }
    return instance;
  }

  async getUserByEmail(email) {
    try {
      let user = await this.model.findOne({ email: email });
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
