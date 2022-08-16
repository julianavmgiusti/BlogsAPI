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

const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userServices.getUserById(id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const removeMe = async (req, res, next) => {
  try {
    await userServices.removeMe(req);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  removeMe,
}; 