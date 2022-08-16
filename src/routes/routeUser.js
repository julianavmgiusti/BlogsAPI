const { Router } = require('express');
const userController = require('../controllers/userController');
const tokenValidation = require('../middlewares/tokenValidation');

const routeUser = Router();

routeUser.post('/', userController.createUser);
routeUser.use(tokenValidation);
routeUser.get('/', userController.getAllUsers);
routeUser.get('/:id', userController.getUserById);
routeUser.delete('/me', userController.removeMe);

module.exports = routeUser;