import { Repository } from "typeorm";
import { Post } from "../models/PostModel";
import { appDataSource } from "./appDataSource";

export class PostService {
    private repository: Repository<Post>;

    constructor() {
        this.repository = appDataSource.getRepository(Post);
    }

    async getAllPosts(filters: Record<string, any>) {
        return this.repository.find({ where: filters });
    }

    async getPostById(id: number) {
        return this.repository.findOne({ where: { id } });
    }

    async createPost(data: { authorId: number; title: string; content: string; status: string }) {
        const post = this.repository.create(data);
        return this.repository.save(post);
    }

    async updatePost(id: number, data: Partial<{ title?: string; content?: string; status?: string }>) {
        const post = await this.repository.findOne({ where: { id } });
        if (!post) {
            throw new Error("Post not found");
        }
        Object.assign(post, data);
        return this.repository.save(post);
    }

    async deletePost(id: number) {
        return this.repository.delete(id);
    }

    async getPostsByUserId(userId: number) {
        return this.repository.find({ where: { authorId: userId } });
    }
}

export const postService = new PostService();
