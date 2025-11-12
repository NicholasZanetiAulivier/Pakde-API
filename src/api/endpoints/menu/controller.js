const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const { tokenValidate } = require('../../../utils/utils');

async function getFoodList(req, res, next) {
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
        const data = await service.getFoods(offset, limit, false, category);
        return res.status(200).json({ offset, limit, data });
    } catch (e) {
        next(e);
    }
}
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
        const data = await service.getFoods(offset, limit, true);
        return res.status(200).json({ offset, limit, data });
    } catch (e) {
        next(e);
    }
}
async function getCategories(req, res, next) {
    try {
        const data = await service.getCategories();
        return res.status(200).json({ data });
    } catch (e) {
        next(e);
    }
}
async function updateFood(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.updateFood(indexAsNumber, req.body);
        return res.status(200).json({ message: "Successfully changed!" });
    } catch (e) {
        next(e);
    }
}
async function updateCategory(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");
        await service.updateCategory(index, req.body);
        return res.status(200).json({ message: "Successfully changed!" });
    } catch (e) {
        next(e);
    }
}
async function deleteFood(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deleteFood(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (e) {
        next(e);
    }
}
async function deleteCategory(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;

        await service.deleteCategory(index);
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (e) {
        next(e);
    }
}
async function createCategory(req, res, next) {
    try {
        tokenValidate(req);
        const { name, description } = req.body;
        if (name === undefined) throw errorResponder(errors.NO_ARGUMENT, "Name isn't supplied");
        if (description === undefined) throw errorResponder(errors.NO_ARGUMENT, "Description isn't supplied");

        const categoryId = await service.createCategory({ name, description });
        return res.status(200).json({ message: "Successfully added!", categoryId });
    } catch (e) {
        next(e);
    }
}
async function createFood(req, res, next) {
    try {
        tokenValidate(req);
        const { name, description, flavour, price, visitors, highlighted, category } = req.body;
        if (name === undefined) throw errorResponder(errors.NO_ARGUMENT, "Name isn't supplied");

        const foodId = await service.createFood({ name, description, flavour, price, visitors, highlighted, category });
        return res.status(200).json({ message: "Successfully created!", foodId });
    } catch (e) {
        next(e);
    }
}

async function getSpecificFood(req, res, next) {
    try {
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        const data = await service.getSpecificFood(index);
        return res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getFoodList,
    getHighlighted,
    getCategories,
    updateCategory,
    updateFood,
    deleteCategory,
    createCategory,
    deleteFood,
    createFood,
    getSpecificFood,
};