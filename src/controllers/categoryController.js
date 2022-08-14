const categoryServices = require('../services/categoryServices');

const create = async (req, res, next) => {
  try {
    const { name } = req.body;
    const result = await categoryServices.create(name);
    return res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

const getAllCategories = async (_req, res) => {
    const result = await categoryServices.gettAllCategories();
    return res.status(200).json(result);
  };

module.exports = {
  create,
  getAllCategories,
}; 