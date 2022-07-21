import daoFactory from "../../containers/daos/index.js";
import Messages from "../../../models/defaultModels/messages/index.js";

let factory = new daoFactory();

export default class apiMessages {
  constructor() {
    this.db = factory.createMessagesDaoDB();
  }

  static getValidation(message) {
    try {
      Messages.validate(message);
    } catch (err) {
      throw new Error(
        "El mensaje posee un formato inválido o falta información" +
          err.details[0].message
      );
    }
  }

  // Método para tomar mensajes del repositorio y devolverlos normalizados al controlador
  async getMessages() {
    try {
      let allMessages = await this.db.getMessages();
      return allMessages;
    } catch (err) {
      console.log(err);
    }
  }

  async getMessagesByEmail(email) {
    try {
      let messages = await this.db.getMessagesByEmail(email);
      return messages;
    } catch (err) {
      console.log(err);
    }
  }

  // Método para guardar un mensaje
  async saveMessage(message) {
    try {
      this.getValidation(message);
      let saved = await this.db.save(message);
      return saved;
    } catch (err) {
      console.log(err);
    }
  }
}
