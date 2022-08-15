const JWT = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
  const token = JWT.sign(user, process.env.JWT_SECRET, {
    expiresIn: '30m',
    algorithm: 'HS256',
  });
  return token;
  };

const verificationToken = (token) => {
  try {
    const { data } = JWT.verify(token, process.env.JWT_SECRET);
    return data;
  } catch (_err) {
    const err = new Error('Expired or invalid token');
    err.code = 'Unauthorized';
    throw err;
  }
};

module.exports = {
  createToken,
  verificationToken,
};