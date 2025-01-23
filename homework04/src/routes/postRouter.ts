import { Router } from "express";
import { postService } from "../services/PostService";

const postRouter = Router();

postRouter.get("/", async (req, res) => {
    const posts = await postService.getAllPosts();
    res.json(posts);
});

postRouter.get("/:id", async (req, res) => {
    const post = await postService.getPostById(req.params.id);
    if (!post) return res.status(404).json({ error: "Post not found" });
    res.json(post);
});

postRouter.get("/user/:userId", async (req, res) => {
    const posts = await postService.getPostsByUserId(req.params.userId);
    res.json(posts);
});

postRouter.post("/", async (req, res) => {
    const post = await postService.createPost({
        ...req.body,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
    res.status(201).json(post);
});

postRouter.put("/:id", async (req, res) => {
    const updatedPost = await postService.updatePost(req.params.id, req.body);
    res.json(updatedPost);
});

postRouter.delete("/:id", async (req, res) => {
    const success = await postService.deletePost(req.params.id);
    res.json({ success });
});

export default postRouter;
