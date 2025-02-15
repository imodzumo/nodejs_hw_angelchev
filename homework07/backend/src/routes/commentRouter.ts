import { Router, Request, Response } from "express";
import { commentService } from "../services/CommentService";

const commentRouter = Router();

// Get all comments for a post
commentRouter.get("/post/:postId", async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getAllComments(Number(req.params.postId));
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new comment
commentRouter.post("/", async (req: Request, res: Response) => {
    try {
        const comment = await commentService.createComment(req.body);
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a comment
commentRouter.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedComment = await commentService.updateComment(Number(req.params.id), req.body);
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a comment
commentRouter.delete("/:id", async (req: Request, res: Response) => {
    try {
        const result = await commentService.deleteComment(Number(req.params.id));
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default commentRouter;
