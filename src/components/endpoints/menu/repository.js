const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getFoodsByCategory(offset, limit, highlighted, category) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            highlighted ?
                `SELECT * FROM foods WHERE category = $1 AND highlighted = true ORDER BY id LIMIT ${limit == 0 ? 'ALL' : '$3'} OFFSET $2`
                :
                `SELECT * FROM foods WHERE category = $1 ORDER BY id LIMIT ${limit == 0 ? 'ALL' : '$3'} OFFSET $2`,
            limit == 0 ? [`${category}`, `${offset}`] : [`${category}`, `${offset}`, `${limit}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting foods by category from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function getFoodsList(offset, limit, highlighted) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            highlighted ?
                `SELECT * FROM foods WHERE highlighted = true ORDER BY id LIMIT ${limit == 0 ? 'ALL' : '$2'} OFFSET $1`
                :
                `SELECT * FROM foods ORDER BY id LIMIT ${limit == 0 ? 'ALL' : '$2'} OFFSET $1`,
            limit == 0 ? [`${offset}`] : [`${offset}`, `${limit}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting foods from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function getCategories() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM food_categories`
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting food categories from database");
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
            `INSERT INTO food_categories(name , description) VALUES($1,$2) RETURNING name`,
            [data.name, data.description]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(`ERROR:`, e.code, e.detail);
            throw errorResponder(errors.DB, "Error creating category in database");
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
            `UPDATE food_categories SET ${finalQuery} WHERE name = $1 RETURNING *`,
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
            `DELETE FROM food_categories WHERE name = $1 RETURNING *`,
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

async function updateFood(id, data) {
    let clientref, res
    let tempKeys = ['date_updated'];
    let tempVals = ['now()'];
    for (const i of ['name', 'description', 'flavour', 'price', 'highlighted', 'category']) {
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
            `UPDATE foods SET ${finalQuery} WHERE id = $1 RETURNING *`,
            [id].concat(tempVals)
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating food from database");
        }).finally(() => {
            clientref.release();
        });
    });
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
}

async function deleteFood(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `DELETE FROM foods WHERE id = $1 RETURNING *`,
            [`${id}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error deleting food from database");
        }).finally(() => {
            clientref.release();
        });
    })
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
    return res;
}

async function createFood(data) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `INSERT INTO foods(name, description, flavour, price, visitors, highlighted, category) VALUES($1 , $2 , $3 , $4 , $5 , $6 , $7 ) RETURNING id`,
            [data.name, data.description ? data.description : null, data.flavour ? data.flavour : null, data.price ? data.price : null, data.visitors ? data.visitors : 0, data.highlighted ? true : false, data.category ? data.category : null]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(`ERROR:`, e.code, e.detail);
            throw errorResponder(errors.DB, "Error creating food in database");
        }).finally(() => {
            clientref.release();
        });
    });
    return res;
}

async function getSpecificFood(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM foods WHERE id = $1`,
            [`${id}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting food from database");
        }).finally(() => {
            clientref.release();
        });
    })
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
    return res;
}

async function updateImage(id, data) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `UPDATE foods SET image_data = $2 , image_date_updated = now() WHERE id = $1 RETURNING *`,
            [id, data]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating image in database");
        }).finally(() => {
            clientref.release();
        });
    })
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
    return res;
}

async function viewFood(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `UPDATE foods SET visitors=visitors+1 WHERE id= $1`,
            [id]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error looking food in database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function view() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `do $$
            BEGIN
            IF EXISTS (SELECT * FROM visitors WHERE day=DATE(NOW())) THEN
                UPDATE visitors SET visits = visits + 1 WHERE day=DATE(NOW());
            ELSE
                INSERT INTO visitors(day) VALUES(DATE(NOW()));
            END IF;
            end $$`
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating view in database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

async function getDashboard() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM visitors ORDER BY day DESC`
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error getting dashboard in database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

module.exports = {
    getFoodsByCategory,
    getFoodsList,
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    updateFood,
    deleteFood,
    createFood,
    getSpecificFood,
    updateImage,
    viewFood,
    view,
    getDashboard,
};