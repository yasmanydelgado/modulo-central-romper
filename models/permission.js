import mongoose from "mongoose";

const Schema = mongoose.Schema;

const permissionSchema = new Schema({
  label: { type: String, required: true },
  code: {type: String, required: true},
  description: String,
  route: { type: String, required: true },
  parentId: Schema.Types.ObjectId,
  children: [ Schema.Types.ObjectId ],
  enabled: { type: Boolean, default: true },
  isRoot: { type: Boolean, default: false },
  isLeaf: { type: Boolean, default: true }
});

export default mongoose.model("Permission", permissionSchema);
