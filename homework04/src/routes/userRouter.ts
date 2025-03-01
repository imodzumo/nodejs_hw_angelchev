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
        const user = await userService.getUserById(req.params.id);
        if (!user) return res.status(404).json({ error: "User not found" });
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create user
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user by ID
userRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedUser = await userService.updateUser(req.params.id, req.body);
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get posts by user ID
userRouter.get("/:userId/posts", async (req, res) => {
    try {
        const posts = await userService.getPostsByUserId(req.params.userId);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete user by ID
userRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const success = await userService.deleteUser(req.params.id);
        res.json({ success });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default userRouter;
