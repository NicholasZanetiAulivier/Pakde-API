const express = require(`express`);
const controller = require('./controller');

const route = express.Router();

//Paths
route.get('/', controller.getContacts);

route.post('/phone', controller.addPhone);
route.put('/phone/:id', controller.changePhone);
route.delete('/phone/:id', controller.deletePhone);

route.post('/email', controller.addEmail);
route.put('/email/:id', controller.changeEmail);
route.delete('/email/:id', controller.deleteEmail);

route.put('/schedule', controller.changeSchedule);

route.post('/address', controller.addAddress);
route.put('/address/:id', controller.changeAddress);
route.delete('/address/:id', controller.deleteAddress);
module.exports = route;