import Joi from "joi";

let email = Joi.string().email().required();
let timestamp = Joi.date().timestamp().required();
let products = Joi.array()
  .items(Joi.object({ _id: Joi.string(), quantity: Joi.number() }))
  .required();
let address = Joi.string().required();

let cartSchema = {
  email,
  timestamp,
  products,
  address,
};

export default cartSchema;
