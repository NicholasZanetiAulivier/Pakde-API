const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const { tokenValidate } = require('../../../utils/utils');

async function getHighlighted(req, res, next) {
    try {
        let { offset, limit } = req.query;
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
        const data = await service.getReviews(offset, limit, true);
        return res.status(200).json({ offset, limit, data });
    } catch (e) {
        next(e);
    }
}
async function getReviews(req, res, next) {
    try {
        let { offset, limit } = req.query;
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
        const data = await service.getReviews(offset, limit, false);
        return res.status(200).json({ offset, limit, data });
    } catch (e) {
        next(e);
    }
}
async function createReview(req, res, next) {
    try {
        tokenValidate(req);
        const { name, email, phone_number, details, review_rating, review_description } = req.body;
        if (name === undefined) throw errorResponder(errors.NO_ARGUMENT, "Name isn't supplied");
        if (email === undefined) throw errorResponder(errors.NO_ARGUMENT, "Email isn't supplied");
        if (phone_number === undefined) throw errorResponder(errors.NO_ARGUMENT, "Phone number isn't supplied");
        if (details === undefined) throw errorResponder(errors.NO_ARGUMENT, "Details aren't supplied");
        if (review_rating === undefined) throw errorResponder(errors.NO_ARGUMENT, "Review rating isn't supplied");
        if (review_description === undefined) throw errorResponder(errors.NO_ARGUMENT, "Review description isn't supplied");

        let temp = Number(review_rating);
        if (isNaN(temp)) throw errorResponder(errors.INVALID_ARGUMENT, "Review rating should be a number");
        if (!Number.isInteger(temp)) throw errorResponder(errors.INVALID_ARGUMENT, "Review rating should be a positive integer");
        if (temp <= 0 || temp > 5) throw errorResponder(errors.INVALID_ARGUMENT, "Index must be between 1-5");

        const reviewId = await service.createReview({ name, email, phone_number, details, review_rating: temp, review_description });
        return res.status(200).json({ message: "Successfully added!", reviewId });
    } catch (e) {
        next(e);
    }
}
async function updateReview(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.updateReview(indexAsNumber, req.body);
        return res.status(200).json({ message: "Successfully changed!" });
    } catch (e) {
        next(e);
    }
}
async function deleteReview(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deleteReview(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getHighlighted,
    getReviews,
    updateReview,
    createReview,
    deleteReview,
};