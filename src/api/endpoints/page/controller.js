const service = require('./service');
const { errorResponder, errors } = require('../../../core/errors');
const jwt = require('jsonwebtoken');

const pages = service.pages;

async function getPage(req, res, next) {
    try {
        const page = req.params.page.toLowerCase() || null;

        if (page == null) throw errorResponder(errors.NO_ARGUMENT, "Page parameter is somehow not supplied!");
        if (!pages.includes(page)) throw errorResponder(errors.NOT_FOUND, `${page} is not in the list of pages`);

        const data = await service.getPage(page);
        return res.status(200).json({
            page,
            data,
        });
    } catch (err) {
        return next(err);
    }
}

async function getPages(req, res, next) {
    return res.status(200).json({
        pages,
    });
}

async function updatePage(req, res, next) {
    try {
        const token = req.get('Authorization') || null; //Auth token sent through header;
        console.log(token);
        if (token == null) throw errorResponder(errors.INVALID_TOKEN, "Token given is invalid or has expired!");
        try {
            jwt.verify(token, process.env.SECRET_KEY);
        } catch (err) {
            throw errorResponder(errors.INVALID_TOKEN, "Token is invalid!");
        }

        const data = req.body.data || null;
        const page = req.params.page.toLowerCase() || null;

        if (data == null) throw errorResponder(errors.NO_ARGUMENT, "data isn't supplied");
        if (page == null) throw errorResponder(errors.NO_ARGUMENT, "page name isn't supplied");
        if (!pages.includes(page)) throw errorResponder(errors.NOT_FOUND, `${page} is not in the database!`);

        await service.updatePage(page, data);
        return res.status(200).json({ message: "Successfully changed!" });
    } catch (err) {
        return next(err);
    }
}

module.exports = {
    getPage,
    getPages,
    updatePage,
};