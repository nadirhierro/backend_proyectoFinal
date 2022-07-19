import Joi from "joi";

let code = Joi.string().required();
let category = Joi.string().required();
let subcategory = Joi.string().required();
let brand = Joi.string().required();
let title = Joi.string().required();
let price = Joi.number().required();
let featured = Joi.boolean().required();
let thumbnail = Joi.string().required();
let stock = Joi.number().required();

let productSchema = {
  code,
  category,
  subcategory,
  brand,
  title,
  price,
  featured,
  thumbnail,
  stock,
};

export default productSchema;
