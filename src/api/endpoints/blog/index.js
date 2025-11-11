const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getBlogsList);
route.get('/categories', controller.getCategories);

// route.put('/:id/image' , controller.addImage) TODO: DO THIS
route.put('/:id', controller.updateBlog);
route.put('/categories/:id', controller.updateCategory);
route.delete('/categories/:id', controller.deleteCategory);
route.post('/categories', controller.createCategory);
route.delete('/:id', controller.deleteBlog);
route.post('/', controller.createBlog);

module.exports = route;