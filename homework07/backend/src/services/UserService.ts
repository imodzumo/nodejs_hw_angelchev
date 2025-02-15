import { User } from "../models/UserModel";
import { Repository } from "typeorm";
import { appDataSource } from "./appDataSource";

export class UserService {
    private repository: Repository<User>;

    constructor() {
        this.repository = appDataSource.getRepository(User);
    }

    async createUser(data: { name: string; email: string; password: string; role: string }) {
        const user = this.repository.create(data);
        return this.repository.save(user);
    }

    async getAllUsers() {
        return this.repository.find();
    }

    async getUserById(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    async updateUser(id: number, data: Partial<User>) {
        const user = await this.repository.findOne({ where: { id } });
        if (!user) throw new Error("User not found");
        Object.assign(user, data);
        return this.repository.save(user);
    }

    async deleteUser(id: number) {
        return this.repository.delete(id);
    }

    async getUserByEmail(email: string) {
        return this.repository.findOne({ where: { email } });
    }
}

export const userService = new UserService();
