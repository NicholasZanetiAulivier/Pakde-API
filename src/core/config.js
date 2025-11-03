const dotenv = require('dotenv');

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').toLowerCase();

const envFound = dotenv.config({ path: '.env' });
if (envFound.error) {
    throw new Error("⚠️ Couldn't find .env file ⚠️");
}

module.exports = {
    env: process.env.NODE_ENV,
    api: {
        prefix: '/api',
    },
    port: process.env.PORT || 5000,
    database: {
        connection: process.env.DB_CONNECTION,
        name: process.env.DB_NAME,
    },
};
