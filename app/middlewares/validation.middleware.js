const { validationResult } = require("express-validator");

module.exports = {
    validate: (req, res, next) => {
        const errors = validationResult(req).formatWith(({ msg }) => msg);

        if (errors.isEmpty()) {
            next();
        } else {
            const error = new Error("Unexpected input value");
            error.statusCode = 422;
            error.meta = { errors: errors.mapped() };
            error.name = "ValidationError";
            throw error;
        }
    },
};
