import Joi from "joi";

export default class Products {
  constructor(
    code,
    category,
    subcategory,
    brand,
    title,
    price,
    featured,
    thumbnail,
    stock
  ) {
    this.code = code;
    this.category = category;
    this.subcategory = subcategory;
    this.brand = brand;
    this.title = title;
    this.price = price;
    this.featured = featured;
    this.thumbnail = thumbnail;
    this.stock = stock;
  }
  // Valdiación de la data
  static validate(product, required) {
    const productSchema = Joi.object({
      code: required ? Joi.number().required() : Joi.number(),
      category: required ? Joi.string().required() : Joi.string(),
      subcategory: required ? Joi.string().required() : Joi.string(),
      brand: required ? Joi.string().required() : Joi.string(),
      name: required ? Joi.string().required() : Joi.string(),
      price: required ? Joi.number().required() : Joi.number(),
      featured: required ? Joi.string().required() : Joi.string(),
      thumbnail: required ? Joi.string().required() : Joi.string(),
      stock: required ? Joi.number().required() : Joi.number(),
    });
    const { error } = productSchema.validate(product);
    if (error) {
      throw error;
    }
  }
}
