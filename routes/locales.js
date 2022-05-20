import express from "express";

import localController from "../controllers/locales.js";
import localValidator from "../validators/locales.js";
import handleErrors from "../middlewares/handle-errors.js";

const router = express.Router();

router.post(
    "/",
    localValidator.createLocal,
    handleErrors(localController.createLocal),
);

router.get(
    "/:localId",
    localValidator.getLocal,
    handleErrors(localController.getLocal)
);

router.get("/", handleErrors(localController.getLocales));

router.delete(
    "/:localId",
    localValidator.deleteLocal,
    handleErrors(localController.deleteLocal)
);

router.put(
    "/:localId",
    localValidator.updateLocal,
    handleErrors(localController.updateLocal)
);

console.log("esto corre por lo menos");

export default router;
