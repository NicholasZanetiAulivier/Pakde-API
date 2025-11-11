const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getBlogsListByCategory(offset, limit, category) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM blogs WHERE category = $1 ORDER BY date_uploaded LIMIT ${limit == 0 ? 'ALL' : '$3'} OFFSET $2`,
            limit == 0 ? [`${category}`, `${offset}`] : [`${category}`, `${offset}`, `${limit}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting blogs by category from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function getBlogsList(offset, limit) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM blogs ORDER BY date_uploaded LIMIT ${limit == 0 ? 'ALL' : '$2'} OFFSET $1`,
            limit == 0 ? [`${offset}`] : [`${offset}`, `${limit}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting blogs from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function createBlog(data) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `INSERT INTO blogs(title, description,story,category) VALUES($1,$2,$3,$4) RETURNING id`,
            [data.title, data.description ? data.description : null, data.story, data.category ? data.category : null]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(`ERROR:`, e.code, e.detail);
            throw errorResponder(errors.DB, "Error creating blog in database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

module.exports = {
    getBlogsList,
    getBlogsListByCategory,
    createBlog,
};