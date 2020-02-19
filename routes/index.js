const userRouter = require('./userRouter');
const express = require('express');
const Router = express.Router();
const accountUser = require('./accountRouter');

Router.use('/users', userRouter);
Router.use('/accounts', accountUser);

module.exports = Router;