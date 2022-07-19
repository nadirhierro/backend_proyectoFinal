export default class Carts {
  constructor(email, timestamp, products, address) {
    this.email = email;
    this.timestamp = timestamp;
    this.products = products;
    this.address = address;
  }
  // Valdiación de la data
  static validate(cart, required) {
    const cartSchema = Joi.object({
      email: required ? Joi.email().required() : Joi.email(),
      timestamp: required
        ? Joi.date().timestamp().required()
        : Joi.date().timestamp(),
      products: required
        ? Joi.array()
            .items(Joi.object({ _id: Joi.string(), quantity: Joi.number() }))
            .required()
        : Joi.array().items(
            Joi.object({ _id: Joi.string(), quantity: Joi.number() })
          ),
      address: required ? Joi.string().required : Joi.string(),
    });
    const { error } = cartSchema.validate(cart);
    if (error) {
      throw error;
    }
  }
}
