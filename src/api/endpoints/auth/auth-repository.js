const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getUser(username) {
    let res, clientref;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            "SELECT * FROM admins WHERE username = $1",
            [username],
        ).then((result) => {
            res = result;
        }).catch((err) => {
            throw errorResponder(errors.DB, "Error getting user from database");
        }).finally(() => {
            clientref.release()
        });
    });
    return res;
}

module.exports = {
    getUser,
};