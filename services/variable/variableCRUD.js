import VariableRepository from "../../repositories/variable.js";
import VariableValidator from "./variableValidator.js";
import CRUDService from "../crud.js";

export default class VariableCRUD extends CRUDService {
    static repository = VariableRepository;

    static async create(variableObject) {
        const {name, description, value} = variableObject;
        await VariableValidator.isUnique({name})
        const variableCreated = await super.create(variableObject)
        return variableCreated;
    }

    static async update(variableId, variableObject) {
        const {name, description, value} = variableObject;
        await VariableValidator.isUnique({name})
        const variableUpdated = await super.update(variableId, variableObject)
        return variableUpdated;
    }
}
