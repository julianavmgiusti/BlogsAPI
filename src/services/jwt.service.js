const jwt = require('jsonwebtoken');
require('dotenv').config();

const createToken = (user) => {
  const token = jwt.sign({ data: user }, process.env.JWT_SECRET, {
    expiresIn: '30m',
    algorithm: 'HS256',
  });
  return token;
  };

module.exports = {
  createToken,
};