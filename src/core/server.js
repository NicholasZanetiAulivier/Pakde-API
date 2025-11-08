const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const config = require('./config');
const logger = require('./logger');
const router = require('../api/routes');
const { errorResponder, errors } = require('./errors');

const app = express();

app.enable('trust proxy');

app.use(cors());

app.use(methodOverride('_method'));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

//Request info log
app.use(function (req, res, next) {
    const ip = req.ip;
    const method = req.method;
    const url = req.originalUrl;
    const params = req.params;
    const query = req.query;
    const json = req.body;

    const log = `${method} ${url} ${ip}`;
    logger.info(log);

    logger.debug(`Params: ${params ? JSON.stringify(params) : "None"}`);
    logger.debug(`Query: ${query ? JSON.stringify(query) : "None"}`);
    logger.debug(`Body: ${json ? JSON.stringify(json) : "None"}`);
    return next();
});

//Main Router
app.use(config.api.prefix, router);

//404 not found
app.use((req, res, next) => {
    return next(errorResponder(errors.ROUTE_NOT_FOUND, 'Route not found'));
})

//Error logs
app.use((err, req, res, next) => {
    const error = `${err.code} ${err.status} ${err.description}`;
    const stack = err.stack || "No stack";
    logger.error(error);
    logger.error(stack);
    return next(err);
});

//Error Response
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        statusCode: err.status || 500,
        error: err.code || 'UNKNOWN_ERROR',
        description: err.description || 'Unknown error',
        message: err.message || 'An error has occurred',
    });
});

app.use((req, res, next) => {
    logger.info("Served");
});

module.exports = app;