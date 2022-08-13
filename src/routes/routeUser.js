const { Router } = require('express');
const userController = require('../controllers/userController');

const routeUser = Router();

routeUser.post('/', userController.createUser);

module.exports = routeUser;