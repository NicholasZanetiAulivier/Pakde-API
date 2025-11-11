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
        obj.metadata = {
            uploaded: i.date_uploaded,
            updated: i.date_updated,
        };
        obj.blog = {
            title: i.title,
            description: i.description,
            story: i.story,
            category: i.category,
        };
        obj.image = {
            name: i.image_name,
            updated: i.image_date_updated,
            data: i.image_data,
        };
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

module.exports = {
    getBlogsList,
    createBlog,
    updateBlog,
    deleteBlog,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory
};