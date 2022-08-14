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

const getAllUsers = async (_req, res) => {
  const users = await userServices.getAllUsers();
  res.status(200).json(users);
};

module.exports = {
  createUser,
  getAllUsers,
}; 