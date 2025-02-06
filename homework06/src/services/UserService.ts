import { User } from "../models/UserModel";
import { Post } from "../models/PostModel";
import { Repository } from "typeorm";
import { appDataSource } from "./appDataSource";

export class UserService {

    private repository: Repository<User>;

    constructor(){
        this.repository = appDataSource.getRepository(User);
    }

    async getAllUsers(filters: Record<string, any>) {
        return this.repository.find(filters);
    }

    async getUserById(id: string) {
        return this.repository.findOneById(id);
    }

    async createUser(data: { name: string; email: string; age: number }) {
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.age = data.age;
        return this.repository.save(user);
    }

    async updateUser(id: string, data: Partial<{ name?: string; email?: string; age?: number }>) {
        const user = await this.repository.findOneById(id);
        if (!user) {
            throw new Error("User is not found")
        }
        user.name = data.name;
        user.email = data.email;
        user.age = data.age;
        await this.repository.save(user);
    }

    async getPostsByUserId(userId: string) {
        return appDataSource.getRepository(Post).find({
            where: { authorId: userId },
        });
    }

    async deleteUser(id: string) {
        return this.repository.delete(id);
    }
}

export const userService = new UserService();
