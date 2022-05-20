import LocalCRUD from "./localCrud.js";
import LocalValidator from "./localValidator.js";

class LocalService {
  static crud = LocalCRUD;
  static validator = LocalValidator;
}

export default LocalService;
