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

async function getCurrentPhoneString() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM misc WHERE attribute = 'contacts_phone_numbers'`
        ).then((result) => {
            res = result;
        }).catch((err) => {
            console.log(err);
            throw errorResponder(errors.DB, "Phone numbers hasn't been initialized");
        }).finally(() =>
            clientref.release()
        );
    });
    return res.rows[0].value;

}

async function updatePhoneNumber(newStr) {
    let clientref, res
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `UPDATE misc SET value = $1 WHERE attribute = 'contacts_phone_numbers'`,
            [newStr]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating phone numbers from database");
        }).finally(() => {
            clientref.release();
        });
    })
}

module.exports = {
    getContactsData,
    getCurrentPhoneString,
    updatePhoneNumber,
};