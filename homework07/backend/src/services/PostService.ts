import { Repository } from "typeorm";
import { Post } from "../models/PostModel";
import { appDataSource } from "./appDataSource";

export class PostService {
    private repository: Repository<Post>;

    constructor() {
        this.repository = appDataSource.getRepository(Post);
    }

    async getAllPosts() {
        return this.repository.find({ relations: ["author", "comments"] });
    }

    async getPostById(id: number) {
        return this.repository.findOne({ where: { id }, relations: ["author", "comments"] });
    }

    async createPost(data: Partial<Post>) {
        const post = this.repository.create(data);
        return this.repository.save(post);
    }

    async updatePost(postId: number, userId: number, data: Partial<Post>) {
        const post = await this.repository.findOne({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        if (post.authorId !== userId) {
            throw new Error("You are not authorized to edit this post");
        }

        Object.assign(post, data);
        return this.repository.save(post);
    }

    async deletePost(postId: number, userId: number) {
        const post = await this.repository.findOne({ where: { id: postId } });
        if (!post) throw new Error("Post not found");

        if (post.authorId !== userId) {
            throw new Error("You are not authorized to delete this post");
        }

        await this.repository.delete(postId);
        return true;
    }
}

export const postService = new PostService();
