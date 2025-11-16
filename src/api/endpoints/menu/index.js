const express = require(`express`);
const controller = require('./controller');
const multer = require('multer');
const multerDontSave = multer();

const route = express.Router();

//Paths
route.get('/list', controller.getFoodList);
route.get('/highlighted', controller.getHighlighted);
route.get('/categories', controller.getCategories);
route.get('/views', controller.getDashboard);
route.get('/:id', controller.getSpecificFood);

route.post('/categories', controller.createCategory);
route.post('/', controller.createFood);

route.put('/:id/image', multerDontSave.single('uploaded_img'), controller.changeImage);
route.put('/categories/:id', controller.updateCategory);
route.put('/:id', controller.updateFood);

route.patch('/view/:id', controller.viewFood);

route.delete('/categories/:id', controller.deleteCategory);
route.delete('/:id', controller.deleteFood);

module.exports = route;