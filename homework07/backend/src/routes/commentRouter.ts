import { Router, Request, Response } from "express";
import { commentService } from "../services/CommentService";
import { authenticateToken } from "../middlewares/authenticator";

const commentRouter = Router();

// Get all comments for a specific post
commentRouter.get("/:postId", async (req: Request, res: Response) => {
    try {
        const comments = await commentService.getCommentsByPostId(Number(req.params.postId));
        res.json(comments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Create a new comment for a specific post
commentRouter.post("/:postId", authenticateToken, async (req: Request, res: Response) => {
    try {
        const comment = await commentService.createComment({
            content: req.body.content,
            userId: req.user.userId,
            postId: Number(req.params.postId),
        });
        res.status(201).json(comment);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a comment by its ID
commentRouter.put("/:postId/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const updatedComment = await commentService.updateComment(
            Number(req.params.id),
            req.user.userId,
            req.body
        );
        res.json(updatedComment);
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

// Delete a comment by its ID
commentRouter.delete("/:postId/:id", authenticateToken, async (req: Request, res: Response) => {
    try {
        const success = await commentService.deleteComment(
            Number(req.params.id),
            req.user.userId,
            Number(req.params.postId)
        );
        res.json({ success });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
});

export default commentRouter;
