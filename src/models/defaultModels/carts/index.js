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
            .items(
              Joi.object({
                _id: Joi.string().required(),
                code: Joi.number().required(),
                category: Joi.string().required(),
                subcategory: Joi.string().required(),
                brand: Joi.string().required(),
                name: Joi.string().required(),
                price: Joi.number().required(),
                featured: Joi.string().required(),
                thumbnail: Joi.string().required(),
                stock: Joi.number().required(),
                quantity: Joi.number().required(),
              })
            )
            .required()
        : Joi.array().items(
            Joi.object({
              _id: Joi.string().required(),
              code: Joi.number().required(),
              category: Joi.string().required(),
              subcategory: Joi.string().required(),
              brand: Joi.string().required(),
              name: Joi.string().required(),
              price: Joi.number().required(),
              featured: Joi.string().required(),
              thumbnail: Joi.string().required(),
              stock: Joi.number().required(),
              quantity: Joi.number().required(),
            })
          ),
      address: required ? Joi.string().required() : Joi.string(),
    });
    const { error } = cartSchema.validate(cart);
    if (error) {
      throw error;
    }
  }
}
