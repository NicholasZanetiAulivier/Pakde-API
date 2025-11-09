const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

const pages = [
    'home',
    'menu',
    'contact',
    'about'
];

async function getPageData(pageName) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM misc WHERE attribute LIKE $1`,
            [`${pageName}%`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting page from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}


module.exports = {
    pages,
    getPageData,
};