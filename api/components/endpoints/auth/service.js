const repository = require('./repository');

async function getUser(username) {
    const results = await repository.getUser(username);
    return results.rows;
}

module.exports = {
    getUser,
}