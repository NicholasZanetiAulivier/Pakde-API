const { env, api } = require('./core/config');
const app = require("./core/server");
const logger = require("./core/logger");
const port = api.port;
const express = require('express');

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

// process.on('uncaughtException', (err) => {
//     // logger.fatal(err, 'Uncaught exception.');

//     // db.end();
//     app.close(() => process.exit(1));

//     setTimeout(() => process.abort(), 1000).unref();
//     process.exit(1);
// });

module.exports = app;
