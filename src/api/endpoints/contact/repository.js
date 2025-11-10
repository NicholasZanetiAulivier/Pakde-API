const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getContactsData() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM misc WHERE attribute LIKE 'contacts%'`
        ).then((result) => {
            res = result;
        }).catch((err) => {
            console.log(err);
            throw errorResponder(errors.DB, "Contacts hasn't been initialized");
        }).finally(() =>
            clientref.release()
        );
    });
    return res;
}

module.exports = {
    getContactsData,
};