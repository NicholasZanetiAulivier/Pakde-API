const db = require('../database/db');
const repopulate = require('./instructions');
const bcrypt = require('bcrypt');

const tables = [
    'foods',
    'blogs',
    'employees',
    'blog_categories',
    'food_categories',
    'admins',
    'users',
    'misc',
    'visitors'
];


let clientref;
//This is the migration part (uses then because async)
db.connect().then(async (client) => {

    //So we can release after finishing this func with or without error
    clientref = client;

    //Drop table functions
    for (const i of tables) {
        await client.query(`DROP TABLE IF EXISTS ${i}`)
            .then(() => console.log(`Table ${i} has been dropped`))
            .catch((e) => console.log(`Error dropping table ${i}:\n ${e}`));
    }

    //Create table functions
    for (const tableName in repopulate.tables) {
        const instruction = repopulate.tables[tableName];
        await client.query(instruction)
            .then(() => console.log(`Table ${tableName} successfully created`))
            .catch((e) => console.log(`Error creating table ${tableName}:\n ${e}`));
    }

    await client.query("SELECT schemaname, tablename FROM pg_catalog.pg_tables WHERE schemaname NOT IN ('pg_catalog', 'information_schema');").then((res) => console.log(res.rows));

    //Seeding
    for (const tableName in repopulate.seeders) {
        const instructions = repopulate.seeders[tableName];
        for (const instruction of instructions) {
            await client.query(instruction)
                .catch((e) => console.log(`Error on instruction: ${instruction}\n${e}`));
        }
        console.log(`Table ${tableName} successfully seeded!`);
    }

    //temp
    await client.query(`INSERT INTO admins(username , password) VALUES ('admin', '${bcrypt.hashSync("1234567890", bcrypt.genSaltSync())}');`);


}).catch(async (e) => {
    console.log("Something went wrong");
    console.log(e);
}).finally(async () => {
    await clientref.release();
    process.exit(0);
});