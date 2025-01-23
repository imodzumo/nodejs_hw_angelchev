import { Router, Request, Response } from "express";
import { postService } from "../services/PostService";

const postRouter = Router();

// Get all posts
postRouter.get("/", async (req: Request, res: Response) => {
    const posts = await postService.getAllPosts();
    res.json(posts);
});

// Get posts by ID
postRouter.get("/:id", async (req: Request, res: Response) => {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
});

// Get posts by user ID
postRouter.get("/user/:userId", async (req, res) => {
    const posts = await postService.getPostsByUserId(req.params.userId);
    res.json(posts);
});

// Create post
postRouter.post("/", async (req: Request, res: Response) => {
    const post = await postService.createPost({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    res.status(201).json(post);
});

// Update post by ID
postRouter.put("/:id", async (req: Request, res: Response) => {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.json(updatedPost);
});

// Delete post by ID
postRouter.delete("/:id", async (req: Request, res: Response) => {
    const success = await postService.deletePost(req.params.id);
    res.json({ success });
});

export default postRouter;
