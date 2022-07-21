import daoFactory from "../../containers/daos/index.js";
import Users from "../../../models/defaultModels/users/index.js";

let factory = new daoFactory();

export default class apiUsers {
  constructor() {
    this.db = factory.createUsersDaoDB();
  }

  static getValidation(user, required) {
    try {
      Users.validate(user, required);
    } catch (err) {
      throw new Error(
        "El mensaje posee un formato inválido o falta información" +
          err.details[0].message
      );
    }
  }

  async getUserByEmail(email) {
    try {
      let user = await this.db.getUserByEmail(email);
      return user;
    } catch (err) {
      console.log(err);
    }
  }

  async saveUser(user) {
    try {
      this.getValidation(user, true);
      let saved = await this.db.save(user);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
