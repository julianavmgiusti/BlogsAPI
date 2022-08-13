const Joi = require('joi');
const { User } = require('../database/models/index');
const JWT = require('./jwt.service');

const validate = ({ email, password }) => {
  const schema = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required(),
});

const { error, value } = schema.validate({ email, password });

if (error) return { status: 400, message: 'Some required fields are missing' };
return value;
};

const signIn = async (email, password) => {
  try {
    const userValidation = validate({ email, password });

    if (userValidation.message) return userValidation;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) return { status: 400, message: 'Invalid fields' };

    const token = JWT.createToken({ email });
    return { status: 200, token };
  } catch (erro) {
    console.log(erro);
  }
};

module.exports = {
  signIn,
};