const userServices = require('../services/userServices');

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  try {
    const results = await userServices.create(displayName, email, password, image);
    res.status(201).json({ token: results });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
}; 