import LocalValidator from "./localValidator.js";
import LocalRepository from "../../repositories/local.js";
import {NotFoundError} from "../../errors.js";
import CRUDService from "../crud.js";

export default class PermissionCRUD extends CRUDService {
    static repository = LocalRepository;

    static async create(localObject) {
        const {name, description} =
            localObject;
        await LocalValidator.isUnique({name})

        const LocalCreated = await this.repository.create({
            name,
            description,
        });
        return LocalCreated;
    }

    static async update(localId, localObject) {
        const local = await this.repository.getById(localId);
        if (!local) {
            throw new NotFoundError(localId);
        }

        console.log(localObject);

        const localUpdated = await this.repository.update(
            localId,
            localObject
        );

        console.log(localUpdated);
        
        return localUpdated;
    }

}
