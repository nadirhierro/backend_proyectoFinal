import Joi from "joi";

let email = Joi.string().email().required();
let type = Joi.string().valid("user", "system").required();
let timestamp = Joi.date().timestamp().required();
let message = Joi.string().required();

let messageSchema = {
  email,
  type,
  timestamp,
  message,
};

export default messageSchema;
