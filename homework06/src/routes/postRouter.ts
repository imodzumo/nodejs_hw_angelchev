import { Router, Request, Response } from "express";
import { postService } from "../services/PostService";
import { body, validationResult } from "express-validator";

const postRouter = Router();

// Validation rules for post creation and update
const validatePost = [
    body('authorId').isInt().withMessage("authorId must be an integer"),
    body('title').trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
    body('content').trim().isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),
    body('status').isIn(["draft", "published", "archived"]).withMessage("Status must be 'draft', 'published', or 'archived'"),
];

// Middleware to check validation results
const validateRequest = (req: Request, res: Response, next: Function) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// Get all posts
postRouter.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAllPosts(req.query);
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get post by ID
postRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create post (POST) with validation
postRouter.post("/", validatePost, validateRequest, async (req: Request, res: Response) => {
    try {
        const post = await postService.createPost({
            ...req.body,
            createdAt: new Date(),
            updatedAt: new Date(),
        });
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update post by ID (PUT) with validation
postRouter.put("/:id", validatePost, validateRequest, async (req: Request, res: Response) => {
    try {
        const updatedPost = await postService.updatePost(req.params.id, req.body);
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete post by ID
postRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const success = await postService.deletePost(req.params.id);
        res.json({ success });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default postRouter;
