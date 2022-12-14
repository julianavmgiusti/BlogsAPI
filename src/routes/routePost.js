const express = require('express');
const postController = require('../controllers/postController');
const tokenValidation = require('../middlewares/tokenValidation');

const routePost = express.Router();

routePost.use(tokenValidation);

routePost.post('/', postController.create);
routePost.get('/', postController.getAllPosts);
routePost.get('/:id', postController.getPostById);
routePost.put('/:id', postController.editPost);
routePost.delete('/:id', postController.removePost);
module.exports = routePost;