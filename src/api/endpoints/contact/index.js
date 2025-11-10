const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/', controller.getContacts);
route.post('/phone', controller.addPhone);
route.put('/phone/:id', controller.changePhone);

module.exports = route;