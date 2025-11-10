const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const jwt = require('jsonwebtoken');

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
        const token = req.get('Authorization') || null;
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err);
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

        const phoneNum = req.body.phoneNumber || null;
        if (phoneNum == null) throw errorResponder(errors.NO_ARGUMENT, "phoneNumber is not supplied");

        await service.addPhone(phoneNum);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function changePhone(req, res, next) {
    try {
        const token = req.get('Authorization') || null;
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err);
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

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
        const token = req.get('Authorization') || null;
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err);
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

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
        const token = req.get('Authorization') || null;
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err);
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

        const email = req.body.email || null;
        if (email == null) throw errorResponder(errors.NO_ARGUMENT, "email is not supplied");

        await service.addEmail(email);
        return res.status(200).json({ message: "Successfully changed!" });

    } catch (e) {
        next(e);
    }
}

async function changeEmail(req, res, next) {
    try {
        const token = req.get('Authorization') || null;
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err);
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

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
        const token = req.get('Authorization') || null;
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            console.log(err);
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

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

module.exports = {
    getContacts,
    addPhone,
    changePhone,
    deletePhone,
    addEmail,
    changeEmail,
    deleteEmail
};