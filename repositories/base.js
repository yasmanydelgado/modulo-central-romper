class BaseRepository {
    static model;

    static getOne(filters) {
        console.log(filters)
        return this.model.findOne(filters)
    }

    static getById(id) {
        return this.model.findById(id);
    }

    static getAll(page, pageSize) {
        return this.model
            .find({})
            .skip((page - 1) * pageSize)
            .limit(pageSize);
    }

    static async create(data) {
        return this.model.create(data);
    }

    static async update(id, data) {
        return this.model.findByIdAndUpdate(id, data, {new: true});
    }

    static async delete(id) {
        return this.model.findByIdAndDelete(id);
    }
}

export default BaseRepository;
