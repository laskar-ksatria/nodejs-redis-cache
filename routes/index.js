const userRouter = require('./userRouter');
const express = require('express');
const Router = express.Router();


Router.use('/users', userRouter);


module.exports = Router;