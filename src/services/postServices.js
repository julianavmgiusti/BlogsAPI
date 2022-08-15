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
    const { id } = await User.findOne({ where: { email: user.email } });
    const ctg = await Category.findAll({ where: { id: categoryIds } });

  if (ctg.length === 0) throwError('BAD_REQUEST', '"categoryIds" not found');
    
    const { dataValues } = await BlogPost.create({ title, content, userId: id });
    await Promise.all(categoryIds.map((item) => PostCategory
    .create({ postId: dataValues.id, categoryId: item })));
    return dataValues;
};

const getAllPosts = async () => {
  const listPosts = await BlogPost.findAll({
    include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } },
    { model: Category, as: 'categories', attributes: ['id', 'name'] },
  ],
  });
  return listPosts;
};

const getPostById = async (id) => {
  const postsById = await BlogPost.findOne({
    where: { id },
    include: [
      { model: User, as: 'user', attributes: { exclude: ['password'] } },
      { model: Category, as: 'categories', attributes: ['id', 'name'] },
    ],
  });

  if (!postsById) throwError('NOT_FOUND', 'Post does not exist');

  return postsById;
};

module.exports = {
  create,
  getAllPosts,
  getPostById,
};