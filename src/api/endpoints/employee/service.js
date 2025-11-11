const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

async function getEmployees() {
    const results = await repository.getEmployees();
    const rows = results.rows;
    const data = [];
    for (const i of rows) {
        let obj = {};
        obj.id = i.id;
        obj.profile = {};
        obj.profile.name = i.name;
        obj.profile.role = i.role;
        obj.profile.description = i.details;
        obj.image = {};
        obj.image.data = i.image_data;
        obj.image.name = i.image_name;
        obj.image.updated = i.image_date_updated;
        data.push(obj);
    }

    return data;
}
module.exports = {
    getEmployees,
};