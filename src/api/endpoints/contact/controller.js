const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');

async function getContacts(req, res, next) {
    try {
        const data = await service.getContactsData(); //TODO: FIX THIS LOGIC
        return res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getContacts,
};