import Joi from "joi";

export default class Orders {
  constructor(state, email, products) {
    this.state = state;
    this.email = email;
    this.products = products;
  }
  // Valdiación de la data
  static validate(order, required) {
    const orderSchema = Joi.object({
      state: required
        ? Joi.string().valid("generated", "in process").required()
        : Joi.string().valid("generated", "in process"),
      email: required ? Joi.string().email().required() : Joi.string().email(),
      products: required
        ? Joi.array()
            .items(Joi.object({ _id: Joi.string(), quantity: Joi.number() }))
            .required()
        : Joi.array().items(
            Joi.object({ _id: Joi.string(), quantity: Joi.number() })
          ),
    });
    const { error } = orderSchema.validate(order);
    if (error) {
      throw error;
    }
  }
}
