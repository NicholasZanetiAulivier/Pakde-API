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
        console.log(token);
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

module.exports = {
    getContacts,
    addPhone,
};