const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');

Router.get('/', UserController.readAll);
Router.post('/', UserController.create);
Router.post('/login', UserController.login);

module.exports = Router;