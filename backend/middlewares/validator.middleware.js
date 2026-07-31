const { z } = require('zod');
const ApiError = require('../utils/ApiError');

const validate = (schema) => async (req, res, next) => {
    try {
        await schema.parseAsync(req.body);
        next();
    } catch (error) {
        if (error instanceof z.ZodError) {
            const formattedErrors = error.errors.map((err) => ({
                field: err.path.join('.'),
                message: err.message,
            }));
            return next(new ApiError(400, "Validation failed", formattedErrors));
        }
        next(error);
    }
};

module.exports = validate;
