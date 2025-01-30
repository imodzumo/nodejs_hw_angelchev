import { User } from "../models/UserModel";
import { Post } from "../models/PostModel";

export class UserService {
    async getAllUsers(filters: Record<string, any>) {
        return User.find(filters);
    }

    async getUserById(id: string) {
        return User.findById(id);
    }

    async createUser(data: { name: string; email: string; age: number }) {
        const user = new User();
        user.name = data.name;
        user.email = data.email;
        user.age = data.age;
        await user.save();
    }

    async updateUser(id: string, data: Partial<{ name?: string; email?: string; age?: number }>) {
        const user = await User.findById(id);
        if (!user) {
            throw new Error("User is not found")
        }
        user.name = data.name;
        user.email = data.email;
        user.age = data.age;
        await user.save();
    }

    async getPostsByUserId(userId: string) {
        return Post.find({ authorId: userId });
    }

    async deleteUser(id: string) {
        return User.deleteOne({_id: id});
    }
}

export const userService = new UserService();
