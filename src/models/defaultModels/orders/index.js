import Joi from "joi";

export default class Orders {
  constructor(state, email, products, address) {
    this.state = state;
    this.email = email;
    this.products = products;
    this.address = address;
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
            .items(
              Joi.object({
                _id: Joi.string().required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                quantity: Joi.number().required(),
              })
            )
            .required()
        : Joi.array().items(
            Joi.object({
              _id: Joi.string().required(),
              name: Joi.string().required(),
              price: Joi.number().required(),
              quantity: Joi.number().required(),
            })
          ),
      address: required ? Joi.string().required() : Joi.string(),
    });
    const { error } = orderSchema.validate(order);
    if (error) {
      throw error;
    }
  }
}
