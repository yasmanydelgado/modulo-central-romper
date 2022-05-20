import {NotFoundError, ValidationError} from "../errors.js";

export default class CRUDService {
  static repository;

  static async create(entityParams) {
    const entityCreated = await this.repository.create(entityParams);
    return entityCreated;
  }

  static async update(id, entityParams) {
    const entityUpdated = await this.repository.update(id, entityParams);
    return entityUpdated;
  }

  static async getById(id) {
    const entity = await this.repository.getById(id);
    if (!entity) {
      throw new NotFoundError(id);
    }
    return entity;
  }

  static async getAll(page, pageSize) {
    return await this.repository.getAll(page, pageSize);
  }

  static async delete(id) {
    if (!(await this.repository.getById(id))) {
      throw new NotFoundError(id);
    }
    const entityDeleted = await this.repository.delete(id);
    return entityDeleted;
  }
}