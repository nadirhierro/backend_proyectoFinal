import Joi from "joi";

export default class Carts {
  constructor(email, products, address) {
    this.email = email;
    this.products = products;
    this.address = address;
  }
  // Valdiación de la data
  static validate(cart, required) {
    const cartSchema = Joi.object({
      email: required ? Joi.string().email().required() : Joi.string().email(),
      products: required
        ? Joi.array()
            .items(Joi.object({ _id: Joi.string(), quantity: Joi.number() }))
            .required()
        : Joi.array().items(
            Joi.object({ _id: Joi.string(), quantity: Joi.number() })
          ),
      address: required ? Joi.string().required() : Joi.string(),
    });
    const { error } = cartSchema.validate(cart);
    if (error) {
      throw error;
    }
  }
}
