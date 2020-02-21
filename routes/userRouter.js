const express = require('express');
const Router = express.Router();
const UserController = require('../controllers/userController');
const { authentification } = require('../middlewares/tokenChecking');

Router.get('/', UserController.readAll);
Router.get('/account', authentification,UserController.readMe);
Router.post('/', UserController.create);
Router.post('/login', UserController.login);

module.exports = Router;