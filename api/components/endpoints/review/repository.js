const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getReviews(offset, limit, highlighted) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            highlighted ?
                `SELECT * FROM users WHERE highlighted = true ORDER BY id LIMIT ${limit == 0 ? 'ALL' : '$2'} OFFSET $1`
                :
                `SELECT * FROM users ORDER BY id LIMIT ${limit == 0 ? 'ALL' : '$2'} OFFSET $1`,
            limit == 0 ? [`${offset}`] : [`${offset}`, `${limit}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting reviews from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function createReview(data) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `INSERT INTO users(name, email , phone_number , details , review_rating , review_description) VALUES($1,$2,$3,$4,$5,$6) RETURNING id`,
            [data.name, data.email, data.phone_number, data.details, data.review_rating, data.review_description]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(`ERROR:`, e.code, e.detail);
            throw errorResponder(errors.DB, "Error creating review in database");
        }).finally(() => {
            clientref.release();
        });
    });
    return res;
}

async function updateReview(id, data) {
    let clientref, res
    let tempKeys = [];
    let tempVals = [];
    for (const i of ['name', 'email', 'phone_number', 'details', 'review_rating', 'review_description', 'highlighted']) {
        if (data[i] === undefined) continue;
        tempKeys.push(i);
        tempVals.push(data[i]);
    }
    let tempQuery = [];
    for (const i in tempKeys) {
        let tempString = `${tempKeys[i]} = $${Number(i) + 2}`;
        tempQuery.push(tempString);
    }
    let finalQuery = tempQuery.join(",");
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `UPDATE users SET ${finalQuery} WHERE id = $1 RETURNING *`,
            [id].concat(tempVals)
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating reviews from database");
        }).finally(() => {
            clientref.release();
        });
    });
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
}

async function deleteReview(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `DELETE FROM users WHERE id = $1 RETURNING *`,
            [`${id}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error deleting reviews from database");
        }).finally(() => {
            clientref.release();
        });
    })
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
    return res;
}

module.exports = {
    getReviews,
    createReview,
    updateReview,
    deleteReview,
};