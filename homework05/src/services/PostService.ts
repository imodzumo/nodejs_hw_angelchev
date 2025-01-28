import {Post} from "../models/PostModel";


export class PostService {
    async getAllPosts(filters: Record<string, any>) {
        return Post.find(filters);
    }

    async getPostById(id: string) {
        return Post.findById(id);
    }

    async createPost(data: {
        authorId: string;
        title: string;
        content: string;
        status: string;
        createdAt: Date;
        updatedAt: Date;
    }) {
        const post = new Post();
        post.title = data.title;
        post.content = data.content;
        post.status = data.status;
        post.createdAt = data.createdAt;
        post.updatedAt = data.updatedAt;
        await post.save();
    }

    async updatePost(id: string, data: Partial<{ title: string; content: string; status: string }>) {
        const post = await Post.findById(id);
        if (!post) {
            throw new Error("Post is not found")
        }
        post.title = data.title;
        post.content = data.content;
        post.status = data.status;
        await post.save();
    }

    async deletePost(id: string) {
        return Post.deleteOne({_id: id});
    }
}

export const postService = new PostService();
