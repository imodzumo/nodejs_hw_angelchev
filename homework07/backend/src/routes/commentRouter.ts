import { Router, Request, Response } from "express";
import { commentService } from "../services/CommentService";
import { authenticateToken } from "../middlewares/authenticator";

const commentRouter = Router();

// Get all comments for a post
commentRouter.get("/post/:postId", async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getCommentsByPostId(Number(req.params.postId));
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new comment
commentRouter.post("/", authenticateToken, async (req: Request, res: Response) => {
    try {
        const comment = await commentService.createComment({
            ...req.body,
            userId: req.user.userId,  // Authenticated user ID
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a comment
commentRouter.put("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const updatedComment = await commentService.updateComment(Number(req.params.id), req.user.userId, req.body);
        res.json(updatedComment);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

// Delete a comment
commentRouter.delete("/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const postId = Number(req.body.postId);
        const success = await commentService.deleteComment(Number(req.params.id), req.user.userId, postId);
        res.json({ success });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

export default commentRouter;
