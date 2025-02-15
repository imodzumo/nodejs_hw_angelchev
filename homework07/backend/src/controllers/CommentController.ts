import { Request, Response } from "express";
import { commentService } from "../services/CommentService";

export const CommentController = {
    async getCommentsByPostId(req: Request, res: Response) {
        try {
            const comments = await commentService.getCommentsByPostId(Number(req.params.postId));
            res.json(comments);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async createComment(req: Request, res: Response) {
        try {
            const comment = await commentService.createComment({
                ...req.body,
                userId: req.user.id,  // Ensure userId is taken from the authenticated user
            });
            res.status(201).json(comment);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    },

    async updateComment(req: Request, res: Response) {
        try {
            const updatedComment = await commentService.updateComment(Number(req.params.id), req.user.id, req.body);
            res.json(updatedComment);
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    },

    async deleteComment(req: Request, res: Response) {
        try {
            const postId = Number(req.params.postId);
            const success = await commentService.deleteComment(Number(req.params.id), req.user.id, postId);
            res.json({ success });
        } catch (err) {
            res.status(403).json({ error: err.message });
        }
    },
};
