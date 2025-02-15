import { Router, Request, Response } from "express";
import { postService } from "../services/PostService";
import { authenticateToken } from "../middlewares/authenticator";

const postRouter = Router();

// Get all posts
postRouter.get("/", async (req: Request, res: Response) => {
    try {
        const posts = await postService.getAllPosts();
        res.json(posts);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get post by ID
postRouter.get("/:id", async (req: Request, res: Response) => {
    try {
        const post = await postService.getPostById(Number(req.params.id));
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new post
postRouter.post("/", async (req: Request, res: Response) => {
    try {
        const post = await postService.createPost(req.body);
        res.status(201).json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a post
postRouter.put("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const updatedPost = await postService.updatePost(Number(req.params.id), req.user.userId, req.body);
        res.json(updatedPost);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

// Delete a post
postRouter.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const result = await postService.deletePost(Number(req.params.id), req.user.userId);
        res.json({ success: result });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

export default postRouter;
