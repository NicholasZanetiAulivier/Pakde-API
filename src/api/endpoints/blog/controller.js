const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const { tokenValidate } = require('../../../utils/utils');

async function getBlogsList(req, res, next) {
    try {
        let { offset, limit, category } = req.query;
        for (const i of [offset, limit]) {
            if (i === undefined) continue;
            const num = Number(i);
            if (Number.isNaN(num)) {
                throw errorResponder(
                    errors.INVALID_ARGUMENT,
                    'Query arguments must be numbers!'
                );
            }
            if (num < 0) {
                throw errorResponder(
                    errors.INVALID_ARGUMENT,
                    `Query arguments cannot be negative!`
                );
            }
            if (!Number.isInteger(num)) {
                throw errorResponder(
                    errors.INVALID_ARGUMENT,
                    'Query arguments must be integers!'
                );
            }
        }
        offset = Number(offset) || 0;
        limit = Number(limit) || 0;
        category = category || null;

        const data = await service.getBlogsList(offset, limit, category);

        return res.status(200).json({ offset, limit, data });
    } catch (e) {
        next(e);
    }
}

async function createBlog(req, res, next) {
    try {
        tokenValidate(req);
        const { title, description, story, category } = req.body;
        if (title === undefined) throw errorResponder(errors.NO_ARGUMENT, "Title isn't supplied");
        if (story === undefined) throw errorResponder(errors.NO_ARGUMENT, "Content isn't supplied");

        const blogId = await service.createBlog({ title, description, story, category });
        return res.status(200).json({ message: "Successfully added!", blogId });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getBlogsList,
    createBlog,
};