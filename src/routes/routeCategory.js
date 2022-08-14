const { Router } = require('express');
const categoryController = require('../controllers/categoryController');
const tokenValidation = require('../middlewares/tokenValidation');

const routeCategory = Router();

routeCategory.use(tokenValidation);

routeCategory.post('/', categoryController.create);
routeCategory.get('/', categoryController.getAllCategories);

module.exports = routeCategory;