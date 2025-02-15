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

    async updatePost(id: number, data: Partial<Post>) {
        const post = await this.repository.findOne({ where: { id } });
        if (!post) throw new Error("Post not found");
        Object.assign(post, data);
        return this.repository.save(post);
    }

    async deletePost(id: number) {
        return this.repository.delete(id);
    }
}

export const postService = new PostService();
