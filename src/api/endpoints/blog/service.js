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
        obj.metadata = {};
        obj.metadata.uploaded = i.date_uploaded;
        obj.metadata.updated = i.date_updated;
        obj.blog = {};
        obj.blog.title = i.title;
        obj.blog.description = i.description;
        obj.blog.story = i.story;
        obj.blog.category = i.category;
        obj.image = {};
        obj.image.name = i.image_name;
        obj.image.updated = i.image_date_updated;
        obj.image.data = i.image_data;
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

module.exports = {
    getBlogsList,
    createBlog,
    updateBlog,
};