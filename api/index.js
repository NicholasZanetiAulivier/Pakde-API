const { env, api } = require('./core/config');
const server = require("./core/server");
// const logger = require("./core/logger");
const db = require("./database/db")
const port = api.port;
const express = require('express');

const app = express();

server(app);

// process.on('uncaughtException', (err) => {
//     // logger.fatal(err, 'Uncaught exception.');

//     // db.end();
//     app.close(() => process.exit(1));

//     setTimeout(() => process.abort(), 1000).unref();
//     process.exit(1);
// });
console.log('HERE')
module.exports = app;
