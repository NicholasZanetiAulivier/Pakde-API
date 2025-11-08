const { errorResponder, errors } = require('../../../core/errors');
const service = require('./auth-service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

async function signInAdmin(req, res, next) {
    try {
        const { username, password } = req.body;

        if (username === undefined) {
            throw errorResponder(errors.NO_ARGUMENT, "Argument 'username' is not supplied");
        }
        if (password === undefined) {
            throw errorResponder(errors.NO_ARGUMENT, "Argument 'password' is not supplied");
        }

        const userRows = await service.getUser(username);

        if (userRows.length > 0) {
            const user = userRows[0];
            const result = bcrypt.compareSync(password, user.password);
            if (!result) {
                throw errorResponder(errors.INVALID_CREDENTIALS, "Password does not match credentials");
            }
            const token = jwt.sign(
                {
                    username,
                    password,
                },
                process.env.SECRET_KEY,
                { expiresIn: "1h" },
            );
            res.status(200).json({ token });
        } else {
            throw errorResponder(errors.INVALID_CREDENTIALS, "User does not exist");
        }
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    signInAdmin,
};