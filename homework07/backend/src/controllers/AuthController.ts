import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { userService } from "../services/UserService";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export const AuthController = {
    async register(req: Request, res: Response) {
        try {
            const existingUser = await userService.getUserByEmail(req.body.email);
            if (existingUser) {
                return res.status(400).json({ error: "Email already in use" });
            }

            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            const user = await userService.createUser({
                ...req.body,
                password: hashedPassword,
                role: req.body.role || "user"
            });
            res.status(201).json(user);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async login(req: Request, res: Response) {
        try {
            const user = await userService.getUserByEmail(req.body.email);
            if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET_KEY, { expiresIn: "1h" });
            res.json({ token });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async logout(req: Request, res: Response) {
        try {
            res.status(200).json({ message: "Successfully logged out" });
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    }
};
