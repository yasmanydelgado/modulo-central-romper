import {NotFoundError, ValidationError} from "../errors.js";

export default class Validator {
    static repo;

    static async exists(id) {
        const element = await this.repo.getById(id);
        if (!element) {
            throw new NotFoundError(id)
        }
        return this;
    };

    static async isUnique(filters) {
        const errors = [];
        for (const key in filters) {
            const element = await this.repo.getOne({[key]: filters[key]})
            console.log(key, filters[key])
            console.log(element)
            if (element) {
                errors.push({field: key, value: filters[key], msg: `El campo ${key} debe ser único`})
            }
        }
        console.log(errors)
        if (errors.length > 0) {
            throw new ValidationError(errors)
        }
        return this;
    }
}
