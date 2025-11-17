const winston = require('winston')

const colors = {
    error: 'red',
    warn: 'yellow',
    info: 'green',
    http: 'magenta',
    debug: 'blue',
}

winston.addColors(colors);

const format = winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize({ all: true }),
    winston.format.printf(
        (info) => `${info.timestamp} ${info.level}: ${info.message}`,
    ),
)

const logger = winston.createLogger({
    level: 'debug',
    format,
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({
            filename: './logs/debug.log',
            level: 'debug',
        }),
        new winston.transports.File({
            filename: './logs/errors.log',
            level: 'error',
        })
    ],
    exceptionHandlers: [
        new winston.transports.File({
            filename: './logs/exceptions.log',
        })
    ]
});


module.exports = logger;