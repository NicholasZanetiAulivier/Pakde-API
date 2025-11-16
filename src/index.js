const { env, api } = require('./core/config');
const server = require("./core/server");
const logger = require("./core/logger");

const express = require('express'); //for vercel

const app = server.listen(api.port, (err) => {
    if (err) {
        // logger.fatal(err, 'Failed to stat the server.');
        process.exit(1);
    } else {
        logger.info(`Server runs at port ${api.port} in ${env} environment`);
    }
});



// process.on('uncaughtException', (err) => {
//     // logger.fatal(err, 'Uncaught exception.');

//     // db.end();
//     app.close(() => process.exit(1));

//     setTimeout(() => process.abort(), 1000).unref();
//     process.exit(1);
// });

module.exports = app;