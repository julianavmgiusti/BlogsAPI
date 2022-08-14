const JWT = require('jsonwebtoken');
require('dotenv').config();

const tokenValidation = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    const SECRET = process.env.JWT_SECRET;

    if (!token) {
      return res.status(401).json({
        message: 'Token not found',
      });
    }
     JWT.verify(token, SECRET);
     next();
  } catch (e) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = tokenValidation;