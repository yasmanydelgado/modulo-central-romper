import { body, param, query } from "express-validator";

import Permission from "../models/permission.js";

const createPermission = [
    body("label")
        .trim()
        .notEmpty()
        .withMessage("La etiqueta provista debe tener al menos un caracter"),
    body("code")
        .trim()
        .notEmpty()
        .withMessage("El código provisto debe tener al menos un caracter"),
    body("parentId")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("El identificador para el padre es inválido"),
    body("isRoot").optional().isBoolean(),
    body("enabled").optional().isBoolean(),
    body("route")
        .isString()
        .trim()
        .notEmpty()
        .withMessage("Debe proveerse una ruta para el permiso"),
];

const deletePermission = [
  param("permissionId")
    .isString()
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      const permission = await Permission.findById(value);
      if (!permission) {
        throw new Error(
          "No existe un permiso con el identificador especificado"
        );
      }
      if (!permission.isLeaf) {
        throw new Error(
          "Solo se pueden eliminar los permisos que no tienen permisos hijos"
        );
      }
      if (permission.isRoot) {
        throw new Error("No se pueden eliminar los permisos de SUPERADMIN");
      }
      return true;
    }),
];

const updatePermission = [
  param("permissionId")
    .isString()
    .custom(async (value, { req }) => {
      const permission = await Permission.findById(value);
      if (!permission) {
        throw new Error("No existe un permiso con el identificador provisto");
      }
      return true;
    }),
  body("parentId")
    .optional()
    .custom(async (value, { req }) => {
      const parent = await Permission.findById(value);
      const existingPermission = await Permission.findById(
        req.params.permissionId
      );
      const parentRoute = parent.route.split("/");
      if (parentRoute.includes(existingPermission.code)) {
        throw new Error(
          "No pueden existir dependencias cíclicas entre los permisos"
        );
      }
      return true;
    }),
];

const getPermission = [
  param("permissionId")
    .isString()
    .custom(async (value, { req }) => {
      const permission = await Permission.findById(value);
      if (!permission) {
        throw new Error(
          "No existe un permiso con el identificador especificado"
        );
      }
      return true;
    }),
];

export default {
  createPermission,
  deletePermission,
  updatePermission,
  getPermission,
};
