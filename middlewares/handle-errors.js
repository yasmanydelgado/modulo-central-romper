import {validationResult} from "express-validator";

import {ValidationError} from "../errors.js";

const handleErrors = (func) => {
    return async (req, res, next) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(new ValidationError(errors.array()));
            }
            return await func(req, res, next)
        } catch (err) {
            return next(err);
        }
    }
}

export default handleErrors;
