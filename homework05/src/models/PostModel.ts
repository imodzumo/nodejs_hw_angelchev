import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const PostSchema = new Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    status: { type: String, enum: ["draft", "published", "archived"], required: true },
    authorId: { type: ObjectId, ref: "User", required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});

export const Post = mongoose.model("Post", PostSchema);
