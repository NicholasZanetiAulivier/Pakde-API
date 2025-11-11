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

module.exports = {
    getBlogsList,
};