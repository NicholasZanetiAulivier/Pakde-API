const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getBlogsList);
route.post('/', controller.createBlog);
// route.put('/:id/image' , controller.addImage) TODO: DO THIS
route.put('/:id', controller.updateBlog);

module.exports = route;