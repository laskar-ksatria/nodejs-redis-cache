const express = require('express');
const Router = express.Router();
const { authentification } = require('../middlewares/tokenChecking');

// Require the controllers
const newAccount = require("../controllers/accountController");

// create a new accounts
Router.post("/newAccount",authentification,newAccount.new_account);


module.exports = Router;