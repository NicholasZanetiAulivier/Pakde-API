const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const config = require('./config');
// const logger = require('./logger');
const router = require('../components/routes');
const { errorResponder, errors } = require('./errors');
const compression = require('compression');

module.exports = (app) => {
    const corsOptions = {
        origin: true, // Or an array of allowed origins
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true, // Allow cookies to be sent with cross-origin requests
        allowedHeaders: ['Content-Type', 'Authorization'] // Specify allowed headers
    };

    app.enable('trust proxy');


    app.use(cors(corsOptions));

    app.use(methodOverride('_method'));

    app.use(bodyParser.json());

    app.use(bodyParser.urlencoded({ extended: false }));

    app.use(compression());

    //Request info log
    app.use(function (req, res, next) {
        const ip = req.ip;
        const method = req.method;
        const url = req.originalUrl;
        // const params = req.params;
        // const query = req.query;
        // const json = req.body;

        const log = `${method} ${url} ${ip}`;
        console.log(log);

        // logger.debug(`Params: ${params ? JSON.stringify(params) : "None"}`);
        // logger.debug(`Query: ${query ? JSON.stringify(query) : "None"}`);
        // logger.debug(`Body: ${json ? JSON.stringify(json) : "None"}`);
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT , PATCH , DELETE, OPTIONS');
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        res.setHeader('Access-Control-Allow-Credentials', 'false');
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
        const cause = err.cause;
        console.error(error);
        console.error(cause);
        console.error(stack);
        // logger.error(error);
        // logger.error(stack);
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
}