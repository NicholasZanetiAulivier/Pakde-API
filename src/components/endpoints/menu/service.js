const repository = require('./repository');

async function getCategories() {
    const res = await repository.getCategories();
    return res.rows;
}

async function createCategory(data) {
    const res = await repository.createCategory(data);
    return res.rows[0].id;
}

async function updateCategory(id, data) {
    await repository.updateCategory(id, data);
    return;
}

async function deleteCategory(id) {
    await repository.deleteCategory(id);
    return;
}

async function getFoods(offset, limit, highlighted, category) {
    let results;
    if (category) {
        results = await repository.getFoodsByCategory(offset, limit, highlighted, category);
    } else {
        results = await repository.getFoodsList(offset, limit, highlighted);
    }

    const rows = results.rows;
    const data = [];

    for (const i of rows) {
        let obj = {};
        obj.id = i.id;
        obj.meta = {
            uploaded: i.date_uploaded,
            updated: i.date_updated,
        }
        obj.food = {
            name: i.name,
            description: i.description,
            flavour: i.flavour,
            price: i.price,
            recommended: i.recommended,
            visitors: i.visitors,
            category: i.category,
        };
        obj.image = {
            name: i.image_name,
            data: i.image_data,
        }
        data.push(obj);
    }

    return data;
}

async function updateFood(id, data) {
    await repository.updateFood(id, data);
    return;
}


async function deleteFood(id) {
    await repository.deleteFood(id);
}

async function createFood(data) {
    const res = await repository.createFood(data);
    return res.rows[0].id;
}

async function getSpecificFood(id) {
    const res = await repository.getSpecificFood(id);
    const i = res.rows[0];
    const obj = {};

    obj.id = i.id;
    obj.meta = {
        uploaded: i.date_uploaded,
        updated: i.date_updated,
    }
    obj.food = {
        name: i.name,
        description: i.description,
        flavour: i.flavour,
        price: i.price,
        recommended: i.recommended,
        visitors: i.visitors,
        category: i.category,
    };
    obj.image = {
        name: i.image_name,
        updated: i.image_date_updated,
        data: i.image_data,
    }

    return obj;
}

async function changeImage(id, data) {
    await repository.updateImage(id, data);
    return;
}

async function viewFood(id) {
    await repository.viewFood(id);
    await repository.view();
    return;
}

async function getDashboard(id) {
    const res = await repository.getDashboard(id);
    return res.rows;
}

module.exports = {
    getCategories,
    getFoods,
    createCategory,
    updateCategory,
    deleteCategory,
    updateFood,
    deleteFood,
    createFood,
    getSpecificFood,
    changeImage,
    viewFood,
    getDashboard,
};