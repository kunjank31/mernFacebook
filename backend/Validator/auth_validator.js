const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),
  username:Joi.string().min(3).max(30).required(),
  cpassword: Joi.ref("password"),
  phone: Joi.string().min(10).max(10),
  desc: Joi.string().max(50),
  city: Joi.string().max(50),
  from: Joi.string().max(50),
});

module.exports = schema;
