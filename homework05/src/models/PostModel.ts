import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const PostSchema = new Schema({
    title: String,
    content: String,
    status: String,
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
});
export const Post = mongoose.model('Post', PostSchema);
