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
    err.code = 'BAD_REQUEST';
    throw err;
  }

  const userAlreadyRegister = await User.findOne({ where: { email } });

  if (userAlreadyRegister) {
    const err = new Error('User already registered');
    err.code = 'CONFLICT';
    throw err;
  }

  await User.create({ displayName, email, password, image });

  const token = JWT.createToken({ email });

  return token;
};

const getAllUsers = async () => {
  const result = await User.findAll({
    attributes: ['id', 'displayName', 'email', 'image'],
  });
  return result;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });

  if (!user) {
    const err = new Error('User does not exist');
    err.code = 'NOT_FOUND';
    throw err;
  }

  return user;
};

const removeMe = async (req) => {
  const deleteMe = await User.destroy({ where: { id: req.user.id } });
  return deleteMe;
};

module.exports = {
  create,
  getAllUsers,
  getUserById,
  removeMe,
};