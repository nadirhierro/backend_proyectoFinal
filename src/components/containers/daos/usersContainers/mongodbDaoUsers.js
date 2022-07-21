import mongodbContainer from "../../mongodbContainer.js";
import { userModel } from "../../../../models/index.js";

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
      let user = await this.model.find({ email: email });
      if (user) {
        return user;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
