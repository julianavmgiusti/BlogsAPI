const express = require('express');
const postController = require('../controllers/postController');
const tokenValidation = require('../middlewares/tokenValidation');

const routePost = express.Router();

routePost.use(tokenValidation);

routePost.post('/', postController.create);
routePost.get('/', postController.getAllPosts);

module.exports = routePost;