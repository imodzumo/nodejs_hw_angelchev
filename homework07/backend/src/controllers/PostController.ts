import { Request, Response } from "express";
import { postService } from "../services/PostService";

export const PostController = {
    async getAllPosts(req: Request, res: Response) {
        try {
            const posts = await postService.getAllPosts();
            res.json(posts);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async getPostById(req: Request, res: Response) {
        try {
            const post = await postService.getPostById(Number(req.params.id));
            if (!post) return res.status(404).json({ error: "Post not found" });
            res.json(post);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createPost(req: Request, res: Response) {
        try {
            const post = await postService.createPost(req.body);
            res.status(201).json(post);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updatePost(req: Request, res: Response) {
        try {
            const post = await postService.getPostById(Number(req.params.id));
            if (!post) return res.status(404).json({ error: "Post not found" });

            // Check if the logged-in user is the author
            if (post.authorId !== req.user.userId) {
                return res.status(403).json({ error: "Access denied" });
            }

            const updatedPost = await postService.updatePost(Number(req.params.id), req.body);
            res.json(updatedPost);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async deletePost(req: Request, res: Response) {
        try {
            const result = await postService.deletePost(Number(req.params.id));
            res.json(result);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },
};
