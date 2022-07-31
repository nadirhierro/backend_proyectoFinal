import Joi from "joi";

let email = Joi.string().email().required();
let timestamp = Joi.date().timestamp().required();
let products = Joi.array()
  .items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
      thumbnail: Joi.string().required(),
    })
  )
  .required();
let address = Joi.string().required();

let cartSchema = {
  email,
  timestamp,
  products,
  address,
};

export default cartSchema;
