import { Router, Request, Response } from "express";
import { userService } from "../services/UserService";

const userRouter = Router();

// Get all users
userRouter.get("/", async (req: Request, res: Response) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get user by ID
userRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const user = await userService.getUserById(Number(req.params.id));
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user profile
userRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser = await userService.updateUser(Number(req.params.id), req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user
userRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const result = await userService.deleteUser(Number(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default userRouter;
