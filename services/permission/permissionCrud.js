import PermissionRepository from "../../repositories/permission.js";
import PermissionValidator from "./permissionValidator.js";
import {NotFoundError} from "../../errors.js";
import CRUDService from "../crud.js";

export default class PermissionCRUD extends CRUDService {
    static repository = PermissionRepository;

    static async create(permissionObject) {
        const {code, label, description, route, parentId, isRoot, enabled} =
            permissionObject;
        let parent;

        await PermissionValidator.isUnique({code, label, route})

        if (parentId) {
            await PermissionValidator.exists(parentId);
            parent = await this.repository.getById(parentId);
            parent.isLeaf = false;
            await this.repository.update(parentId, parent);
        }

        const permissionCreated = await this.repository.create({
            label,
            code,
            description,
            parentId,
            route,
            isRoot,
            enabled
        });

        if (parent) {
            parent.children.push(permissionCreated._id);
            await this.repository.update(parentId, parent);
        }

        return permissionCreated;
    }

    static async update(permissionId, permissionObject) {
        const permission = await this.repository.getById(permissionId);
        if (!permission) {
            throw new NotFoundError(permissionId);
        }

        console.log(permissionObject);

        const permissionUpdated = await this.repository.update(
            permissionId,
            permissionObject
        );

        console.log(permissionUpdated);

        const {parentId} = permissionObject;
        if (parentId) {
            const parent = await this.repository.getById(parentId);
            if (!parent) {
                throw new NotFoundError(parentId);
            }
            parent.isLeaf = false;
            parent.children.push(permissionUpdated._id);
            await this.repository.update(parentId, parent);
        }

        return permissionUpdated;
    }

}
