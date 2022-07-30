import Joi from "joi";

export default class Messages {
  constructor(email, type, message) {
    this.email = email;
    this.type = type;
    this.message = message;
  }
  // Valdiación de la data
  static validate(message) {
    const messageSchema = Joi.object({
      email: Joi.string().email().required(),
      type: Joi.string().valid("user", "system").required(),
      message: Joi.string().required(),
    });
    const { error } = messageSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}
