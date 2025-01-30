import { Router, Request, Response } from "express";
import { userService } from "../services/UserService";
import { body, validationResult } from "express-validator";

const userRouter = Router();

// Validation rules for user creation and update
const validateUser = [
    body('name').trim().isLength({ min: 2 }).withMessage("Name must be at least 2 characters"),
    body('email').trim().isEmail().withMessage("Invalid email format"),
    body('age').isInt({ min: 18 }).withMessage("Age must be min 18"),
];

// Middleware to check validation results
const validateRequest = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

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

// Create user (POST) with validation
userRouter.post("/", validateUser, validateRequest, async (req: Request, res: Response) => {
    try {
        const user = await userService.createUser(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update user by ID (PUT) with validation
userRouter.put("/:id", validateUser, validateRequest, async (req: Request, res: Response) => {
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
