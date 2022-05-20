import express from "express";

import variablesController from "../controllers/variables.js";
import handleErrors from "../middlewares/handle-errors.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *  name: Variables
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    CreateVariableForm:
 *      type: object
 *      required:
 *        - name
 *        - value
 *      properties:
 *        name:
 *           type: string
 *        description:
 *          type: string
 *        value:
 *          type: string
 *      example:
 *        name: SESION
 *        description: Tiempo que el usuario está logeado en horas
 *        value: 2

 *    Variable:
 *      type: object
 *      required:
 *        - name
 *        - value
 *      properties:
 *        id:
 *          type: string
 *          description: Identificador de Mongo DB de la variable
 *        name:
 *           type: string
 *        description:
 *          type: string
 *        value:
 *          type: string
 *      example:
 *        id: 62447560fdc142a7a21906e4
 *        name: SESION
 *        description: Tiempo que el usuario está logeado en horas
 *        value: 2
 */

/**
 * @swagger
 *  /variables:
 *    post:
 *      summary: Crear una nueva variable
 *      tags: [Variables]
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateVariableForm'
 *      responses:
 *        201:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Variable'
 *                  description: "La variable creada"
 */
router.post(
    "/",
    handleErrors(variablesController.createVariable),
);

/**
 * @swagger
 *  /variables/{id}:
 *    put:
 *      summary: Editar una variable
 *      tags: [Variables]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: Id de la variable
 *      requestBody:
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateVariableForm'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Variable'
 *                  description: "La variable actualizada"
 */
router.put(
    "/:variableId",
    handleErrors(variablesController.updateVariable),
);

/**
 * @swagger
 *  /variables/{id}:
 *    get:
 *      summary: Obtener una variable
 *      tags: [Variables]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: Id de la variable
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  variable:
 *                      type: object
 *                      $ref: '#/components/schemas/Variable'
 */
router.get("/:variableId",
    handleErrors(variablesController.getVariable)
)

/**
 * @swagger
 *  /variables:
 *    get:
 *      summary: Obtener todas las variables
 *      tags: [Variables]
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
 *                        $ref: '#/components/schemas/Variable'
 */
router.get("/", handleErrors(variablesController.getVariables))

/**
 * @swagger
 *  /variables/{id}:
 *    delete:
 *      summary: Eliminar una variable
 *      tags: [Variables]
 *      parameters:
 *        - in: path
 *          name: id
 *          schema:
 *            type: string
 *          description: Id de la variable
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  message:
 *                      type: string
 *                  variable:
 *                      type: object
 *                      $ref: '#/components/schemas/Variable'
 */
router.delete(
    "/:variableId",
    handleErrors(variablesController.deleteVariable),
);

export default router;
