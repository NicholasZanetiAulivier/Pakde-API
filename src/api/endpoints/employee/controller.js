const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const { tokenValidate } = require('../../../utils/utils');

async function getEmployees(req, res, next) {
    try {
        const data = await service.getEmployees();
        return res.status(200).json(data);
    } catch (e) {
        next(e);
    }
}

module.exports = {
    getEmployees,
};