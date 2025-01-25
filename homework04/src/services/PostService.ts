import { Db, ObjectId } from "mongodb";
import {db} from "./DatabaseService";

export class PostService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async getAllPosts(filters = {}) {
        return this.db.collection("posts").find(filters).toArray();
    }

    async getPostById(id: string) {
        return this.db.collection("posts").findOne({ _id: new ObjectId(id) });
    }

    async createPost(data: {
        authorId: string;
        title: string;
        content: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        const result = await this.db.collection("posts").insertOne(data);
        return { _id: result.insertedId, ...data };
    }

    async updatePost(id: string, data: Partial<{ title: string; content: string; status: string }>) {
        const result = await this.db.collection("posts").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async deletePost(id: string) {
        const result = await this.db.collection("posts").deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
}

export const postService = new PostService(db);
