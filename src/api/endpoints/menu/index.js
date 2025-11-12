const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/list', controller.getFoodList);
route.get('/highlighted', controller.getHighlighted);
route.get('/categories', controller.getCategories);
route.get('/:id', controller.getSpecificFood);

// route.put('/:id/image' , controller.addImage) TODO: DO THIS
route.post('/categories', controller.createCategory);
route.post('/', controller.createFood);

route.put('/categories/:id', controller.updateCategory);
route.put('/:id', controller.updateFood);

route.delete('/categories/:id', controller.deleteCategory);
route.delete('/:id', controller.deleteFood);

module.exports = route;