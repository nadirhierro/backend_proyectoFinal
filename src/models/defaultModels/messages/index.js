import Joi from "joi";

export default class Messages {
  constructor(author, type, message) {
    this.author = author;
    this.type = type;
    this.message = message;
  }
  // Valdiación de la data
  static validate(message) {
    const messageSchema = Joi.object({
      author: Joi.object({
        email: Joi.string().email().required(),
        alias: Joi.string().required(),
      }).required(),
      type: Joi.string().required(),
      message: Joi.string().required(),
    });
    const { error } = messageSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}
