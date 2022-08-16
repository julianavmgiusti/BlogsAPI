const postServices = require('../services/postServices');

const create = async (req, res, next) => {
  const { title, content, categoryIds } = req.body;
  const userEmail = req.user;

  try {
    const result = await postServices.create(title, content, categoryIds, userEmail);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};
const getAllPosts = async (_req, res, next) => {
  try {
    const result = await postServices.getAllPosts();
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await postServices.getPostById(id);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

const editPost = async (req, res, next) => {
  const { title, content } = req.body;

  try {
    const result = await postServices.editPost(req, title, content);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAllPosts,
  getPostById,
  editPost,
};