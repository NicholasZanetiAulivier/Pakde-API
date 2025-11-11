const { errorResponder, errors } = require("../core/errors");
const jwt = require('jsonwebtoken');

function swap(json) {
    var ret = {};
    for (var key in json) {
        ret[json[key]] = key;
    }
    return ret;
}

function tokenValidate(req) {
    const token = req.get('Authorization') || null;
    if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
    try {
        jwt.verify(token, process.env.SECRET_KEY);
    } catch (err) {
        console.log(err);
        throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
    }
    return;
}

module.exports = {
    swap,
    tokenValidate,
};