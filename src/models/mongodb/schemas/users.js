import Joi from "joi";

let email = Joi.string().email().required();
let password = Joi.object({
  iv: Joi.string().required(),
  content: Joi.string().required(),
}).required();
let name = Joi.string().required();
let surname = Joi.string().required();
let alias = Joi.string().required();
let address = Joi.string().required();
let phone = Joi.string().required();
let age = Joi.number().required();
let avatar = Joi.string().required();
let isAdmin = Joi.boolean();

let userSchema = {
  email,
  password,
  name,
  surname,
  alias,
  age,
  address,
  phone,
  avatar,
  isAdmin,
};

export default userSchema;
