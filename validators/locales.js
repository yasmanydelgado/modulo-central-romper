import { body, param, query } from "express-validator";

import Local from "../models/local.js";

const createLocal = [
    body("name")
        .trim()
        .notEmpty()
        .withMessage("El nombre provisto debe tener al menos un caracter"),
    body("description")
        .trim()
        .notEmpty()
        .withMessage("La descripcion provista debe tener al menos un caracter"),
];

const deleteLocal = [
  param("permissionId")
    .isString()
    .trim()
    .notEmpty()
    .custom(async (value, { req }) => {
      const local = await Local.findById(value);
      if (!local) {
        throw new Error(
          "No existe un local con el identificador especificado"
        );
      }
      return true;
    }),
];

const updateLocal = [
  param("localId")
    .isString()
    .custom(async (value, { req }) => {
      const local = await Local.findById(value);
      if (!local) {
        throw new Error("No existe un permiso con el identificador provisto");
      }
      return true;
    }),

];

const getLocal = [
  param("localId")
    .isString()
    .custom(async (value, { req }) => {
      const local = await Local.findById(value);
      if (!local) {
        throw new Error(
          "No existe un local con el identificador especificado"
        );
      }
      return true;
    }),
];

export default {
  createLocal,
  deleteLocal,
  updateLocal,
  getLocal,
};
