const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/', controller.getContacts);

module.exports = route;