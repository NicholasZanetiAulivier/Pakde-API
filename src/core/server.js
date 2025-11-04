const express = require('express');

const config = require('./config');
const logger = require('./logger');

const app = express();

app.use(logger);

//Tests
app.get('/', (req, res) => {
    res.send(`${111}`);
})

//Error Response
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        statusCode: err.status || 500,
        error: err.code || 'UNKNOWN_ERROR',
        description: err.description || 'Unknown error',
        message: err.message || 'An error has occurred',
    });
});

module.exports = app;