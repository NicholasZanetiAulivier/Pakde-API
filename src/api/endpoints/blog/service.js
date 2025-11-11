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

module.exports = {
    getBlogsList,
};