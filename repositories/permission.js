import Permission from "../models/permission.js";
import BaseRepository from "./base.js";

class PermissionRepository extends BaseRepository {
  static model = Permission;
}

export default PermissionRepository;
