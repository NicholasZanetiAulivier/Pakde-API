const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.post('/signin', controller.signInAdmin);
route.get('/verify', controller.verify);

module.exports = route;