import PermissionRepository from "../../repositories/permission.js";
import Validator from "../validation.js";

export default class PermissionValidator extends Validator {
    static repo = PermissionRepository;
}