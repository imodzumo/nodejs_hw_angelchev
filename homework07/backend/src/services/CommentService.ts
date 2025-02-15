import { Repository } from "typeorm";
import { Comment } from "../models/CommentModel";
import { appDataSource } from "./appDataSource";
import { Post } from "../models/PostModel";

export class CommentService {
    private repository: Repository<Comment>;

    constructor() {
        this.repository = appDataSource.getRepository(Comment);
    }

    async getCommentsByPostId(postId: number) {
        return this.repository.find({
            where: { postId },
            order: { createdAt: "ASC" },
        });
    }

    async createComment(data: { userId: number; postId: number; content: string }) {
        const comment = this.repository.create(data);
        return this.repository.save(comment);
    }

    async updateComment(commentId: number, userId: number, data: { content: string }) {
        const comment = await this.repository.findOne({ where: { id: commentId, userId } });
        if (!comment) {
            throw new Error("Comment not found or you do not have permission to edit it.");
        }
        Object.assign(comment, data);
        return this.repository.save(comment);
    }

    async deleteComment(commentId: number, userId: number, postId: number) {
        const comment = await this.repository.findOne({ where: { id: commentId } });
        if (!comment) throw new Error("Comment not found");

        const post = await appDataSource.getRepository(Post).findOne({ where: { id: postId } });
        if (comment.userId !== userId && post?.authorId !== userId) {
            throw new Error("You do not have permission to delete this comment.");
        }

        await this.repository.delete(commentId);
        return true;
    }
}

export const commentService = new CommentService();
