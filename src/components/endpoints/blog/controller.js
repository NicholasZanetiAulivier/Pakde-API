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

async function updateBlog(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.updateBlog(indexAsNumber, req.body);
        return res.status(200).json({ message: "Successfully changed!" });
    } catch (e) {
        next(e);
    }
}

async function deleteBlog(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deleteBlog(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });
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

async function getSpecificBlog(req, res, next) {
    try {
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        const data = await service.getSpecificBlog(index);
        return res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}

async function changeImage(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        const { data } = req.body || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is not supplied");
        if (data == null) throw errorResponder(errors.NO_ARGUMENT, "Image file data is not supplied");
        if (typeof data !== 'string' || !data.startsWith('data:')) throw errorResponder(errors.INVALID_ARGUMENT, "Data is not an image datastring");
        if (!/^(data:image\/(jpeg|png|gif|webp|svg\+xml|bmp|tiff);base64,)/.test(data)) throw errorResponder(errors.INVALID_ARGUMENT, "data is not an image datastring!");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.changeImage(index, data);
        return res.status(200).json({ message: "Image Changed" });
    } catch (e) {
        next(e);
    }
}
module.exports = {
    getBlogsList,
    createBlog,
    updateBlog,
    deleteBlog,
    getCategories,
    updateCategory,
    deleteCategory,
    createCategory,
    getSpecificBlog,
    changeImage,
};