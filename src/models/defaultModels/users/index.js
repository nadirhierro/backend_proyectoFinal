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
  static validate(user) {
    const userSchema = Joi.object({
      email: Joi.email().required(),
      password: Joi.object({
        iv: Joi.string().required(),
        content: Joi.string().required(),
      }).required(),
      name: Joi.string().required(),
      surname: Joi.string().required(),
      alias: Joi.string().required(),
      address: Joi.string().required(),
      phone: Joi.number().required(),
      age: Joi.number().required(),
      avatar: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
    });
    const { error } = userSchema.validate(message);
    if (error) {
      throw error;
    }
  }
}
