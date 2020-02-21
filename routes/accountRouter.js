const express = require('express');
const Router = express.Router();
const { authentification } = require('../middlewares/tokenChecking');

// Require the controllers
const AccountController = require('../controllers/accountController');

// create a new accounts
Router.post("/newAccount",authentification,AccountController.create);
Router.get('/eth', authentification,AccountController.readMyEth);
Router.get('/', AccountController.readAll);
Router.get('/myAccount', authentification,AccountController.readMe);


module.exports = Router;