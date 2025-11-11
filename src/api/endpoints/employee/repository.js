const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getEmployees() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM employees`
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting employees from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

module.exports = {
    getEmployees,
};