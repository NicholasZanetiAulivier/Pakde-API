const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getBlogsList);
route.get('/categories', controller.getCategories);
route.get('/:id', controller.getSpecificBlog);

route.post('/categories', controller.createCategory);
route.post('/', controller.createBlog);

route.put('/categories/:id', controller.updateCategory);
route.put('/:id/image', controller.changeImage);//NEEDS MULTIPART/FORM
route.put('/:id', controller.updateBlog);

route.delete('/categories/:id', controller.deleteCategory);
route.delete('/:id', controller.deleteBlog);

module.exports = route;