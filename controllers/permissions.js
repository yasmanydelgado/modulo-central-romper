import PermissionService from "../services/permission/permission.js";

const createPermission = async (req, res, next) => {
    const permissionCreated = await PermissionService.crud.create(req.body);
    return res.status(201).json({
      message: "Permission created successfully",
      permission: permissionCreated,
    });
};

const deletePermission = async (req, res, next) => {
  const permissionId = req.params.permissionId;
  const permissionDeleted = await PermissionService.crud.delete(permissionId);
  return res.status(200).json({
    message: "Permisssion deleted successfully",
    permission: permissionDeleted,
  });
};

const updatePermission = async (req, res, next) => {
  const permissionId = req.params.permissionId;
  const permissionUpdated = await PermissionService.crud.update(
      permissionId,
      req.body
  );
  return res.status(200).json({
    message: "Permisssion updated successfully",
    permission: permissionUpdated,
  });
};

const getPermission = async (req, res, next) => {
  const permissionId = req.params.permissionId;
  const permission = await PermissionService.crud.getById(permissionId);
  return res.status(200).json({
    message: "Permisssion fetched successfully",
    permission: permission,
  });
};

const getPermissions = async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const permissionsPage = await PermissionService.crud.getAll(page, pageSize);
  return res.status(200).json({
    message: "Permissions fetched successfully",
    permissions: permissionsPage,
  });

};

export default {
  createPermission,
  deletePermission,
  updatePermission,
  getPermission,
  getPermissions,
};
