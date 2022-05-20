import LocalService from "../services/local/local.js";

const createLocal = async (req, res, next) => {
    const localCreated = await LocalService.crud.create(req.body);
    return res.status(201).json({
      message: "Local created successfully",
      local: localCreated,
    });
};

const deleteLocal = async (req, res, next) => {
  const localId = req.params.localId;
  const localDeleted = await LocalService.crud.delete(localId);
  return res.status(200).json({
    message: "Local deleted successfully",
    local: localDeleted,
  });
};

const updateLocal = async (req, res, next) => {
  const localId = req.params.localId;
  const localUpdated = await localService.crud.update(
      localId,
      req.body
  );
  return res.status(200).json({
    message: "Local updated successfully",
    local: localUpdated,
  });
};

const getLocal = async (req, res, next) => {
  const localId = req.params.localId;
  const local = await LocalService.crud.getById(localId);
  return res.status(200).json({
    message: "Local fetched successfully",
    local: local,
  });
};

const getLocales = async (req, res, next) => {
  const page = req.query.page || 1;
  const pageSize = req.query.pageSize || 10;
  const localesPage = await LocalService.crud.getAll(page, pageSize);
  return res.status(200).json({
    message: "Local fetched successfully",
    locales: localesPage,
  });

};

export default {
  createLocal,
  deleteLocal,
  updateLocal,
  getLocal,
  getLocales,
};
