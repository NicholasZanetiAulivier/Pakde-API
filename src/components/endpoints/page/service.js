const { errorResponder, errors } = require('../../../core/errors');
const repository = require('./repository');

const pageMap = repository.pageMap;

const pageAttributes = repository.pageAttributes;

async function getPage(pageName) {
    const result = await repository.getPageData(pageName);
    const rows = result.rows;

    if (rows.length == 0) {
        throw errorResponder(errors.DB, `${pageName} data hasn't been initialized`);
    }

    const map = pageMap[pageName];
    const data = {};
    for (const i of rows) {
        let attrib = i.attribute;
        let val = i.value;
        data[map[attrib]] = val;
    }
    return data;
}

async function updatePage(page, data) {
    for (const attrib of pageAttributes[page]) {
        if (!(attrib in data)) continue;
        await repository.updatePageAttribute(page, attrib, data[attrib]);
    }
}

module.exports = {
    pages: repository.pages,
    getPage,
    updatePage,
};