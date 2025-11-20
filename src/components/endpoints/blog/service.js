const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

async function getBlogsList(offset, limit, category) {
    let results;
    if (category) {
        results = await repository.getBlogsListByCategory(offset, limit, category);
    } else {
        results = await repository.getBlogsList(offset, limit);
    }

    const rows = results.rows;
    const data = [];

    for (const i of rows) {
        let obj = {};
        obj.id = i.id;
        obj.meta = {
            uploaded: i.date_uploaded,
            updated: i.date_updated,
        };
        obj.blog = {
            title: i.title,
            description: i.description,
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

async function createBlog(data) {
    const res = await repository.createBlog(data);
    return res.rows[0].id;
}

async function updateBlog(id, data) {
    await repository.updateBlog(id, data);
    return;
}

async function deleteBlog(id) {
    await repository.deleteBlog(id);
}

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

async function getSpecificBlog(id) {
    const res = await repository.getSpecificBlog(id);
    const i = res.rows[0];
    const obj = {};

    obj.id = i.id;
    obj.meta = {
        uploaded: i.date_uploaded,
        updated: i.date_updated,
    };
    obj.blog = {
        title: i.title,
        description: i.description,
        category: i.category,
        story: i.story,
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

module.exports = {
    getBlogsList,
    createBlog,
    updateBlog,
    deleteBlog,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory,
    getSpecificBlog,
    changeImage,
};