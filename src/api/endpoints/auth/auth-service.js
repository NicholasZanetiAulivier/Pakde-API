const repository = require('./auth-repository');

async function getUser(username) {
    const results = await repository.getUser(username);
    return results.rows;
}

module.exports = {
    getUser,
}