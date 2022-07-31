import Joi from "joi";

let timestamp = Joi.date().timestamp().required();
let state = Joi.string().valid("generated", "in process").required();
let address = Joi.string().required();
let email = Joi.string().email().required();
let products = Joi.array()
  .items(
    Joi.object({
      _id: Joi.string().required(),
      name: Joi.string().required(),
      price: Joi.number().required(),
      quantity: Joi.number().required(),
    })
  )
  .required();

let orderSchema = {
  timestamp,
  state,
  email,
  products,
  address,
};

export default orderSchema;
