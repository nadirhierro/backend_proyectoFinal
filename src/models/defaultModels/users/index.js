import Joi from "joi";

export default class Users {
  constructor(
    email,
    password,
    name,
    surname,
    alias,
    address,
    phone,
    age,
    avatar,
    isAdmin
  ) {
    this.email = email;
    this.password = password;
    this.name = name;
    this.surname = surname;
    this.alias = alias;
    this.address = address;
    this.phone = phone;
    this.age = age;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
  }
  // Valdiación de la data
  static validate(user, required) {
    const userSchema = Joi.object({
      email: required ? Joi.string().email().required() : Joi.email(),
      password: required
        ? Joi.object({
            iv: Joi.string().required(),
            content: Joi.string().required(),
          }).required()
        : Joi.object({
            iv: Joi.string(),
            content: Joi.string(),
          }),
      name: required ? Joi.string().required() : Joi.string(),
      surname: required ? Joi.string().required() : Joi.string(),
      alias: required ? Joi.string().required() : Joi.string(),
      address: required ? Joi.string().required() : Joi.string(),
      phone: required ? Joi.string().required() : Joi.string(),
      age: required ? Joi.number().required() : Joi.number(),
      avatar: required ? Joi.string().required() : Joi.string(),
      isAdmin: required ? Joi.boolean().required() : Joi.boolean(),
    });
    const { error } = userSchema.validate(user);
    if (error) {
      throw error;
    }
  }
}
