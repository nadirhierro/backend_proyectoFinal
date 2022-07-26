import daoFactory from "../../containers/daos/index.js";
import Users from "../../../models/defaultModels/users/index.js";
import Logger from "../../../utils/logger/index.js";

let factory = new daoFactory();

export default class apiUsers {
  constructor() {
    this.db = factory.createUsersDaoDB();
    this.logger = Logger.getInstance();
  }

  getValidation(user, required) {
    try {
      Users.validate(user, required);
    } catch (err) {
      this.logger.logWrongData(err.details[0].message);
      throw err.details[0].message;
    }
  }

  async getUserByEmail(email) {
    try {
      let user = await this.db.getUserByEmail(email);
      return user;
    } catch (err) {
      throw err;
    }
  }

  async saveUser(user) {
    try {
      this.getValidation(user, true);
      let saved = await this.db.save(user);
      return saved;
    } catch (err) {
      throw err;
    }
  }
}
