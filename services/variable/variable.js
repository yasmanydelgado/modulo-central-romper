import VariableCRUD from "./variableCRUD.js";
import VariableValidator from "./variableValidator.js";

class VariableService {
  static crud = VariableCRUD;
  static validator = VariableValidator;
}

export default VariableService;
