const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

async function getContactsData() {
    const result = await repository.getContactsData();
    console.log(result);
    return result.rows;
}

module.exports = {
    getContactsData,
};