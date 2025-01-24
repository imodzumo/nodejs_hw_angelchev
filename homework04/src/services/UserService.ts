import { Db, ObjectId } from "mongodb";
import {db} from "./DatabaseService";

export class UserService {
    private db: Db;

    constructor(db: Db) {
        this.db = db;
    }

    async getAllUsers(filters = {}) {
        return this.db.collection("users").find(filters).toArray();
    }

    async getUserById(id: string) {
        return this.db.collection("users").findOne({ _id: new ObjectId(id) });
    }

    async createUser(data: { name: string; email: string; age: number }) {
        const result = await this.db.collection("users").insertOne(data);
        return { _id: result.insertedId, ...data };
    }

    async updateUser(id: string, data: Partial<{ name: string; email: string; age: number }>) {
        const result = await this.db.collection("users").findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: data },
            { returnDocument: "after" }
        );
        return result.value;
    }

    async getPostsByUserId(userId: string) {
        return this.db.collection("posts").find({ authorId: userId }).toArray();
    }

    async deleteUser(id: string) {
        const result = await this.db.collection("users").deleteOne({ _id: new ObjectId(id) });
        return result.deletedCount > 0;
    }
}

export const userService = new UserService(db);
