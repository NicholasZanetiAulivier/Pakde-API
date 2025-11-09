const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');

const pages = service.pages;

async function getPage(req, res, next) {
    try {
        const page = req.params.page.toLowerCase() || null;

        if (page == null) throw errorResponder(errors.NO_ARGUMENT, "Page parameter is somehow not supplied!");
        if (!pages.includes(page)) throw errorResponder(errors.NOT_FOUND, `${page} is not in the list of pages`);

        const data = await service.getPage(page);
        return res.status(200).json({
            page,
            data,
        });
    } catch (err) {
        return next(err);
    }
}

async function getPages(req, res, next) {
    return res.status(200).json({
        pages,
    });
}

module.exports = {
    getPage,
    getPages,
}