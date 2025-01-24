import { Router, Request, Response } from "express";
import { postService } from "../services/PostService";

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
        const post = await postService.getPostById(req.params.id);
        if (!post) return res.status(404).json({ error: "Post not found" });
        res.json(post);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// Create post
postRouter.post("/", async (req: Request, res: Response) => {
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

// Update post by ID
postRouter.put("/:id", async (req: Request, res: Response) => {
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
