const { env, port } = require('./core/config');
const server = require("./core/server");

const app = server.listen(port, (err) => {
    if (err) {
        // logger.fatal(err, 'Failed to stat the server.');
        process.exit(1);
    } else {
        // logger.info(`Server runs at port ${port} in ${env} environment`);
    }
});

process.on('uncaughtException', (err) => {
    // logger.fatal(err, 'Uncaught exception.');

    app.close(() => process.exit(1));

    setTimeout(() => process.abort(), 1000).unref();
    process.exit(1);
});
