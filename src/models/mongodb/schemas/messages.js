import Joi from "joi";

let author = Joi.object({
  email: Joi.email().required(),
  alias: Joi.string().required(),
}).required();
let type = Joi.string().required();
let timestamp = Joi.date().timestamp().required();
let message = Joi.string().required();

let messageSchema = {
  author,
  type,
  timestamp,
  message,
};

export default messageSchema;
