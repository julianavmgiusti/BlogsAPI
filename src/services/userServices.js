const Joi = require('joi');
const { User } = require('../database/models');
const JWT = require('./jwt.service');

const schema = Joi.object({
  displayName: Joi.string().min(8).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  image: Joi.string().required(),
});

const create = async (displayName, email, password, image) => {
  const { error } = schema.validate({ displayName, email, password, image });

  if (error) {
    const err = new Error(error.message);
    err.code = 'BadRequest';
    throw err;
  }

  const userAlreadyRegister = await User.findOne({ where: { email } });

  if (userAlreadyRegister) {
    const err = new Error('User already registered');
    err.code = 'Conflict';
    throw err;
  }

  await User.create({ displayName, email, password, image });

  const token = JWT.createToken(email);

  return token;
};

module.exports = {
  create,
};