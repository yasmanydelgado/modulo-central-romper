import express from "express";

import permissionController from "../controllers/permissions.js";
import permissionValidator from "../validators/permissions.js";
import handleErrors from "../middlewares/handle-errors.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Permissions
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    PermissionForm:
 *      type: object
 *      required:
 *        - code
 *        - label
 *        - route
 *      properties:
 *        code:
 *           type: string
 *        label:
 *          type: string
 *        description:
 *          type: string
 *        route:
 *          type: string
 *          description: Ruta del permiso.
 *        parentId:
 *          type: string
 *          description: Identificador del padre del permiso, si es que tiene.
 *        isRoot:
 *          type: bool
 *          description: Si es permiso de super usuario
 *      example:
 *        code: ABNCDE
 *        label: Crear usuarios
 *        description: Permite crear usuarios en la aplicación
 *        route: /permissions/create
 *        isRoot: true
 *    UpdatePermissionForm:
 *      type: object
 *      required:
 *        - code
 *        - label
 *        - route
 *      properties:
 *        code:
 *           type: string
 *        label:
 *          type: string
 *        description:
 *          type: string
 *        route:
 *          type: string
 *          description: Ruta del permiso.
 *        parentId:
 *          type: string
 *          description: Identificador del padre del permiso, si es que tiene.
 *        isRoot:
 *          type: bool
 *          description: Si es permiso de super usuario
 *      example:
 *        code: ABNCDE
 *        label: Crear usuarios
 *        description: Permite crear usuarios en la aplicación
 *        route: /permissions/create
 *        parentId: 6244768646efb032e07263fa
 *        isRoot: true
 *    Permission:
 *      type: object
 *      required:
 *        - code
 *        - label
 *        - route
 *      properties:
 *        id:
 *          type: string
 *          description: Identificador de Mongo DB del permiso
 *        code:
 *           type: string
 *        label:
 *          type: string
 *        description:
 *          type: string
 *        route:
 *          type: string
 *          description: Ruta del permiso.
 *        parentId:
 *          type: string
 *          description: Identificador del padre del permiso, si es que tiene.
 *        isRoot:
 *          type: bool
 *          description: Si es permiso de super usuario
 *      example:
 *        id: 62447560fdc142a7a21906e4
 *        code: ABNCDE
 *        label: Crear usuarios
 *        description: Permite crear usuarios en la aplicación
 *        route: /permissions/create
 *        parentId: 6244768646efb032e07263fa
 *        isRoot: true
 */

/**
 * @swagger
 *  /permissions:
 *    post:
 *      summary: Crear un nuevo permiso
 *      tags: [Permissions]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PermissionForm'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Permission'
 *                  description: "El permiso creado"
 */
router.post(
    "/",
    permissionValidator.createPermission,
    handleErrors(permissionController.createPermission),
);


/**
 * @swagger
 *  /permissions/{id}:
 *    get:
 *      summary: Obtener un permiso
 *      tags: [Permissions]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: Id del permiso
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  permission:
 *                      type: object
 *                      $ref: '#/components/schemas/Permission'
 */
router.get(
    "/:permissionId",
    permissionValidator.getPermission,
    handleErrors(permissionController.getPermission)
);

/**
 * @swagger
 *  /permissions:
 *    get:
 *      summary: Obtener todos los permisos
 *      tags: [Permissions]
 *      parameters:
 *        - in: query
 *          name: page
 *          schema:
 *            type: integer
 *          description: Número de la página
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: integer
 *          description: Cantidad de items a obtener
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  items:
 *                      type: array
 *                      items:
 *                        $ref: '#/components/schemas/Permission'
 */
router.get("/", handleErrors(permissionController.getPermissions));

/**
 * @swagger
 *  /permissions/{id}:
 *    delete:
 *      summary: Eliminar un permiso
 *      tags: [Permissions]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: Id del permiso
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  permission:
 *                      type: object
 *                      $ref: '#/components/schemas/Permission'
 *                      description: "El permiso eliminado"
 */
router.delete(
    "/:permissionId",
    permissionValidator.deletePermission,
    handleErrors(permissionController.deletePermission)
);

/**
 * @swagger
 *  /permissions/{id}:
 *    put:
 *      summary: Editar un permiso
 *      tags: [Permissions]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: Id del permiso
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UpdatePermissionForm'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Permission'
 *                  description: "El permiso actualizado"
 */
router.put(
    "/:permissionId",
    permissionValidator.updatePermission,
    handleErrors(permissionController.updatePermission)
);

export default router;
