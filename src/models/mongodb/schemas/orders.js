import Joi from "joi";

let orderId = Joi.number().required();
let timestamp = Joi.date().timestamp().required();
let state = Joi.string().valid("generated", "in process").required();
let email = Joi.email().required();
let products = Joi.array()
  .items(Joi.object({ _id: Joi.string(), quantity: Joi.number() }))
  .required();

let orderSchema = {
  orderId,
  timestamp,
  state,
  email,
  products,
};

export default orderSchema;
