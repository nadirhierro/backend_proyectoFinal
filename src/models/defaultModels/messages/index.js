import Joi from "joi";

export default class Messages {
  constructor(author, type, timestamp, message) {
    this.author = author;
    this.type = type;
    this.timestamp = timestamp;
    this.message = message;
  }
  // Valdiación de la data
  static validate(message) {
    const messageSchema = Joi.object({
      author: Joi.object({
        email: Joi.email().required(),
        alias: Joi.string().required(),
      }).required(),
      type: Joi.string().required(),
      timestamp: Joi.date().timestamp().required(),
      message: Joi.string().required(),
    });
    const { error } = messageSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}
