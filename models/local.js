import mongoose from "mongoose";

const Schema = mongoose.Schema;

const localSchema = new Schema({
  name: { type: String, required: true },
  description: {type: String, required: true},
});

export default mongoose.model("Local", localSchema);
