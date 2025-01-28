import {User} from "../models/UserModel";


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
        // return this.db.collection("posts").find({ authorId: userId }).toArray();
    }

    async deleteUser(id: string) {
        return User.deleteOne({_id: id});
    }
}

export const userService = new UserService();
