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
    });
    return res;
}

async function updateBlog(id, data) {
    let clientref, res
    let tempKeys = [];
    let tempVals = [];
    for (const i of ['title', 'story', 'description', 'category']) {
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
            `UPDATE blogs SET ${finalQuery} WHERE id = $1 RETURNING *`,
            [id].concat(tempVals)
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating page attribute from database");
        }).finally(() => {
            clientref.release();
        });
    });
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
}

async function deleteBlog(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `DELETE FROM blogs WHERE id = $1 RETURNING *`,
            [`${id}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error deleting blog from database");
        }).finally(() => {
            clientref.release();
        });
    })
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
    return res;
}

async function getCategories() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM blog_categories`
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting blog categories from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function createCategory(data) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `INSERT INTO blog_categories(name , description) VALUES($1,$2) RETURNING name`,
            [data.name, data.description]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(`ERROR:`, e.code, e.detail);
            throw errorResponder(errors.DB, "Error creating blog in database");
        }).finally(() => {
            clientref.release();
        });
    });
    return res;
}

async function updateCategory(id, data) {
    let clientref, res
    let tempKeys = [];
    let tempVals = [];
    for (const i of ['name', 'description']) {
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
            `UPDATE blog_categories SET ${finalQuery} WHERE name = $1 RETURNING *`,
            [id].concat(tempVals)
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating category from database");
        }).finally(() => {
            clientref.release();
        });
    });
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
}

async function deleteCategory(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `DELETE FROM blog_categories WHERE name = $1 RETURNING *`,
            [`${id}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error deleting category from database");
        }).finally(() => {
            clientref.release();
        });
    })
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
    return res;
}

module.exports = {
    getBlogsList,
    getBlogsListByCategory,
    createBlog,
    updateBlog,
    deleteBlog,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory,
};