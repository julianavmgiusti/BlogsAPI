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

module.exports = {
  create,
}; 