const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getPages);
route.get('/:page', controller.getPage);

module.exports = route;