const { errorResponder, errors } = require('../../../core/errors');
const db = require('../../../database/db');

async function getEmployees() {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `SELECT * FROM employees ORDER BY id`
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

async function createEmployee(data) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `INSERT INTO employees(name , role , details) VALUES ($1,$2,$3) RETURNING id`,
            [data.name, data.role, data.description]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(`ERROR:`, e.code, e.detail);
            throw errorResponder(errors.DB, "Error creating employee in database");
        }).finally(() => {
            clientref.release();
        });
    });
    return res;
}

async function updateEmployee(id, data) {
    let clientref, res
    let tempKeys = [];
    let tempVals = [];
    for (const i of ['name', 'role', 'description']) {
        if (data[i] === undefined) continue;
        tempKeys.push(i == 'description' ? 'details' : i);
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
            `UPDATE employees SET ${finalQuery} WHERE id = $1 RETURNING *`,
            [id].concat(tempVals)
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error updating employee from database");
        }).finally(() => {
            clientref.release();
        });
    });
    if (res.rows.length == 0) throw errorResponder(errors.DB, `There are no rows of ID ${id}`);
}

async function deleteEmployee(id) {
    let clientref, res;
    await db.connect().then(async (client) => {
        clientref = client;
        await client.query(
            `DELETE FROM employees WHERE id = $1`,
            [`${id}`]
        ).then((result) => {
            res = result;
        }).catch((e) => {
            console.log(e);
            throw errorResponder(errors.DB, "Error deleting employees from database");
        }).finally(() => {
            clientref.release();
        });
    })
    return res;
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
};