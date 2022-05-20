import LocalRepository from "../../repositories/local.js";
import Validator from "../validation.js";

export default class LocalValidator extends Validator {
    static repo = LocalRepository;
}