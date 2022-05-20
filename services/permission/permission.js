import PermissionCRUD from "./permissionCrud.js";
import PermissionValidator from "./permissionValidator.js";

class PermissionService {
  static crud = PermissionCRUD;
  static validator = PermissionValidator;
}

export default PermissionService;
