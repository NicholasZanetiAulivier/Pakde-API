const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

async function getBlogsList(offset, limit, category) {
    let results;
    if (category) {
        results = await repository.getBlogsListByCategory(offset, limit, category);
    } else {
        results = await repository.getBlogsList(offset, limit);
    }
    return results.rows;
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