import Variable from "../models/variable.js";
import BaseRepository from "./base.js";

class VariableRepository extends BaseRepository {
    static model = Variable;
}

export default VariableRepository;
