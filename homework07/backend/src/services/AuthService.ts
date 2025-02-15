import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";
import { User } from "../models/UserModel";
import { appDataSource } from "./appDataSource";

export class AuthService {
    private userRepository = appDataSource.getRepository(User);

    async register(data: { name: string; email: string; password: string }) {
        const hashedPassword = await bcrypt.hash(data.password, 10);
        const user = this.userRepository.create({ ...data, password: hashedPassword });
        return this.userRepository.save(user);
    }

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({ where: { email } });
        if (!user || !(bcrypt.compareSync(password, user.password))) {
            throw new Error("Invalid email or password");
        }
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!, { expiresIn: "1h" });
        return { user, token };
    }

    async editUserProfile(userId: number, data: Partial<{ name: string; email: string; password: string }>) {
        const updateData: Partial<User> = {};

        if (data.name) {
            updateData.name = data.name;
        }

        if (data.email) {
            const existingUser = await this.userRepository.findOne({ where: { email: data.email } });
            if (existingUser && existingUser.id !== userId) {
                throw new Error("Email is already in use");
            }
            updateData.email = data.email;
        }

        if (data.password) {
            updateData.password = await bcrypt.hash(data.password, 10);
        }

        if (Object.keys(updateData).length === 0) {
            throw new Error("No valid fields to update");
        }

        await this.userRepository.update(userId, updateData);

        return this.userRepository.findOne({ where: { id: userId } });
    }

    async logout() {
        return;
    }
}
