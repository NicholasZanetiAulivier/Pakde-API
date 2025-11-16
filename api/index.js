const express = require('express');
const server = require("./core/server");

const app = express();
server(app);

// process.on('uncaughtException', (err) => {
//     // logger.fatal(err, 'Uncaught exception.');

//     // db.end();
//     app.close(() => process.exit(1));

//     setTimeout(() => process.abort(), 1000).unref();
//     process.exit(1);
// });
module.exports = app;
