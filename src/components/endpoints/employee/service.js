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

async function createEmployee(data) {
    const results = await repository.createEmployee(data);
    return results.rows[0].id;
}

async function updateEmployee(id, data) {
    await repository.updateEmployee(id, data);
    return;
}

async function deleteEmployee(id) {
    await repository.deleteEmployee(id);
    return;
}

async function changeImage(id, data) {
    await repository.updateImage(id, data);
    return;
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    changeImage
};