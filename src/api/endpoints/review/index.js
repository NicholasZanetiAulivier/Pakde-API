const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/highlighted', controller.getHighlighted);
route.get('/list', controller.getReviews);

route.post('/', controller.createReview);

route.put('/:id', controller.updateReview);

route.delete('/:id', controller.deleteReview);


module.exports = route;