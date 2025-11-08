const errors = {
    ROUTE_NOT_FOUND: {
        description: "Route not found!",
        status: 404,
        code: 'ROUTE_NOT_FOUND_ERROR',
    },
    NOT_FOUND: {
        description: "Empty response, not found!",
        status: 404,
        code: 'NOT_FOUND_ERROR',
    },
};


function errorResponder(code, status, description, message = "") {
    const err = new Error(message);

    err.code = code;
    err.status = status;
    err.description = description;

    return err;
}

function errorResponder(type, message = "") {
    const error = new Error(message);

    if (type) {
        error.code = type.code || 'UNKNOWN_ERROR';
        error.status = type.status || 500;
        error.description = type.description || 'Unknown error occurred';
    }

    return error;
}

module.exports = {
    errorResponder,
    errors
};