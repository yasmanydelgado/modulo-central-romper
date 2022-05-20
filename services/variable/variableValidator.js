import VariableRepository from "../../repositories/variable.js";
import Validator from "../validation.js";

export default class VariableValidator extends Validator {
    static repo = VariableRepository;
}
