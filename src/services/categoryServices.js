const { Category } = require('../database/models');

const create = async (name) => {
  if (!name) {
    const err = new Error('"name" is required');
    err.code = 'BAD_REQUEST';
    throw err;
  }

  const result = await Category.create({ name });

  return {
    id: result.null,
    name,
  };
};

const gettAllCategories = async () => {
    const categories = await Category.findAll();
    return categories;
  };

module.exports = {
  create,
  gettAllCategories,
}; 