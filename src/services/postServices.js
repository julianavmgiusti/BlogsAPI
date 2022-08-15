const Joi = require('joi');
const { User, Category, BlogPost, PostCategory } = require('../database/models');

const schema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  categoryIds: Joi.array().items(Joi.number()),
});

const throwError = (code, message) => {
  const e = new Error(message);
  e.code = code;
  throw e;
};

const create = async (title, content, categoryIds, user) => {
  const { error } = schema.validate({ title, content, categoryIds });
  if (error) throwError('BAD_REQUEST', 'Some required fields are missing');
    const { id } = await User.findOne({ where: { email: user.data.email } });
    const ctg = await Category.findAll({ where: { id: categoryIds } });

  if (ctg.length === 0) throwError('BAD_REQUEST', '"categoryIds" not found');
    
    const { dataValues } = await BlogPost.create({ title, content, userId: id });
    await Promise.all(categoryIds.map((item) => PostCategory
    .create({ postId: dataValues.id, categoryId: item })));
    return dataValues;
};

module.exports = {
  create,
};