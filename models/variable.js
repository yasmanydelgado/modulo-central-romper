import mongoose from "mongoose";

const Schema = mongoose.Schema;

const variableSchema = new Schema({
    name: {type: String, required: true},
    description: String,
    value: {type: String, required: true}
});

export default mongoose.model("Variable", variableSchema);
