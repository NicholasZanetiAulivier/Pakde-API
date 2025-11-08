const express = require(`express`);

const controller = require('./auth-controller');

const route = express.Router();

//Paths

route.post('/signin', controller.signInAdmin);

module.exports = route;