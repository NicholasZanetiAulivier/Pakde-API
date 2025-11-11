const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getEmployees);
route.post('/', controller.createEmployee);
// route.put('/:id/image' , controller.addImage) TODO: DO THIS
route.put('/:id', controller.updateEmployee);
route.delete('/:id', controller.deleteEmployee);

module.exports = route;