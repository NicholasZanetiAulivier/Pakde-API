const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const { tokenValidate } = require('../../../utils/utils');

async function getEmployees(req, res, next) {
    try {
        const data = await service.getEmployees();
        return res.status(200).json({ data });
    } catch (e) {
        next(e);
    }
}

async function createEmployee(req, res, next) {
    try {
        tokenValidate(req);
        const { name, role, description } = req.body;
        if (name === undefined) throw errorResponder(errors.NO_ARGUMENT, "Name isn't supplied");
        if (role === undefined) throw errorResponder(errors.NO_ARGUMENT, "Role isn't supplied");
        if (description === undefined) throw errorResponder(errors.NO_ARGUMENT, "description isn't supplied");

        const employeeId = await service.createEmployee({ name, role, description });
        return res.status(200).json({ message: "Successfully added!", employeeId });
    } catch (e) {
        next(e);
    }
}

async function updateEmployee(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.updateEmployee(indexAsNumber, req.body);
        return res.status(200).json({ message: "Successfully changed!" });
    } catch (e) {
        next(e);
    }
}

async function deleteEmployee(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deleteEmployee(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });
    } catch (e) {
        next(e);
    }
}

async function changeImage(req, res, next) {
    try {
        tokenValidate(req);
        const index = req.params.id || null;
        const f = req.file || null;
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is not supplied");
        if (f == null) throw errorResponder(errors.NO_ARGUMENT, "Image file is not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.changeImage(index, f);
        return res.status(200).json({ message: "Image Changed" });
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    changeImage,
};