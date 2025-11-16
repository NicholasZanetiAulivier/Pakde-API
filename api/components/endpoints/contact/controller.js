const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const { tokenValidate } = require('../../../utils/utils');

async function getContacts(req, res, next) {
    try {
        const data = await service.getContactsData();
        return res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

async function addPhone(req, res, next) {
    try {
        tokenValidate(req);

        const phoneNum = req.body.phoneNumber || null;
        if (phoneNum == null) throw errorResponder(errors.NO_ARGUMENT, "phoneNumber is not supplied");

        await service.addPhone(phoneNum);
        return res.status(200).json({ message: "Successfully added!" });

    } catch (e) {
        next(e);
    }
}

async function changePhone(req, res, next) {
    try {
        tokenValidate(req);

        const phoneNum = req.body.phoneNumber || null;
        const index = req.params.id || null; //Protocol: use indeces specified by the order given by GET /contacts

        if (phoneNum == null) throw errorResponder(errors.NO_ARGUMENT, "phoneNumber is not supplied");
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.changePhone(phoneNum, indexAsNumber);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function deletePhone(req, res, next) {
    try {
        tokenValidate(req);

        const index = req.params.id || null; //Protocol: use indeces specified by the order given by GET /contacts
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");
        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deletePhone(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });

    } catch (e) {
        next(e);
    }
}

async function addEmail(req, res, next) {
    try {
        tokenValidate(req);
        const email = req.body.email || null;
        if (email == null) throw errorResponder(errors.NO_ARGUMENT, "email is not supplied");

        await service.addEmail(email);
        return res.status(200).json({ message: "Successfully added!" });

    } catch (e) {
        next(e);
    }
}

async function changeEmail(req, res, next) {
    try {
        tokenValidate(req);

        const email = req.body.email || null;
        const index = req.params.id || null; //Protocol: use indeces specified by the order given by GET /contacts

        if (email == null) throw errorResponder(errors.NO_ARGUMENT, "email is not supplied");
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.changeEmail(email, indexAsNumber);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function deleteEmail(req, res, next) {
    try {
        tokenValidate(req);

        const index = req.params.id || null; //Protocol: use indeces specified by the order given by GET /contacts
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deleteEmail(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });

    } catch (e) {
        next(e);
    }
}

async function changeSchedule(req, res, next) {
    try {
        tokenValidate(req);

        const schedule = req.body || null;

        if (schedule == null) throw errorResponder(errors.NO_ARGUMENT, "schedule is not supplied");

        await service.changeSchedule(schedule);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function addAddress(req, res, next) {
    try {
        tokenValidate(req);

        const addressName = req.body.name || null;
        const addressPath = req.body.address || null;
        if (addressName == null) throw errorResponder(errors.NO_ARGUMENT, "address name is not supplied");
        if (addressPath == null) throw errorResponder(errors.NO_ARGUMENT, "address is not supplied");

        await service.addAddress(addressName, addressPath);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function changeAddress(req, res, next) {
    try {
        tokenValidate(req);

        const addressName = req.body.name || null;
        const addressPath = req.body.address || null;
        const index = req.params.id;
        if (addressName == null) throw errorResponder(errors.NO_ARGUMENT, "address name is not supplied");
        if (addressPath == null) throw errorResponder(errors.NO_ARGUMENT, "address is not supplied");
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.changeAddress(addressName, addressPath, indexAsNumber);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function deleteAddress(req, res, next) {
    try {
        tokenValidate(req);

        const index = req.params.id || null; //Protocol: use indeces specified by the order given by GET /contacts
        if (index == null) throw errorResponder(errors.NO_ARGUMENT, "Index is somehow not supplied");

        const indexAsNumber = Number(index);
        if (isNaN(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a number");
        if (!Number.isInteger(indexAsNumber)) throw errorResponder(errors.INVALID_ARGUMENT, "Index should be a positive integer");
        if (indexAsNumber < 0) throw errorResponder(errors.INVALID_ARGUMENT, "Index must not be negative");

        await service.deleteAddress(indexAsNumber);
        return res.status(200).json({ message: "Successfully deleted!" });

    } catch (e) {
        next(e);
    }
}

module.exports = {
    getContacts,
    addPhone,
    changePhone,
    deletePhone,
    addEmail,
    changeEmail,
    deleteEmail,
    changeSchedule,
    addAddress,
    changeAddress,
    deleteAddress,
};