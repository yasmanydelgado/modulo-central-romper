import VariableService from "../services/variable/variable.js";


const createVariable = async (req, res, next) => {
    const variableCreated = await VariableService.crud.create(req.body);
    return res.status(201).json({
        message: "Variable created successfully",
        variable: variableCreated,
    });
};


const deleteVariable = async (req, res, next) => {
    const variableId = req.params.variableId;
    const variableDeleted = await VariableService.crud.delete(variableId);
    return res.status(200).json({
        message: "Variable deleted successfully",
        variable: variableDeleted,
    });
};


const updateVariable = async (req, res, next) => {
    const variableId = req.params.variableId;
    const variableUpdated = await VariableService.crud.update(
        variableId,
        req.body
    );
    return res.status(200).json({
        message: "Variable updated successfully",
        variable: variableUpdated,
    });
};


const getVariable = async (req, res, next) => {
    const variableId = req.params.variableId;
    const variable = await VariableService.crud.getById(variableId);
    return res.status(200).json({
        message: "Variable fetched successfully",
        variable,
    });
};


const getVariables = async (req, res, next) => {
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const variables = await VariableService.crud.getAll(page, pageSize);
    return res.status(200).json({
        message: "Variables fetched successfully",
        variables
    });
};

export default {
    createVariable,
    deleteVariable,
    updateVariable,
    getVariable,
    getVariables,
};
