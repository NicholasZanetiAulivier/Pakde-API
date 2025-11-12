const express = require(`express`);
const controller = require('./controller');
const multer = require('multer');
const multerDontSave = multer();

const route = express.Router();

//Paths
route.get('/list', controller.getEmployees);

route.post('/', controller.createEmployee);

route.put('/:id/image', multerDontSave.single('uploaded_img'), controller.changeImage);
route.put('/:id', controller.updateEmployee);

route.delete('/:id', controller.deleteEmployee);

module.exports = route;