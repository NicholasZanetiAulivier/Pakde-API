const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getBlogsList);

module.exports = route;