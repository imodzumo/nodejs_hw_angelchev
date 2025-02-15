import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "./PostModel";
import { Comment } from "./CommentModel";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("text")
    name: string;

    @Column("text")
    email: string;

    @Column("text")
    password: string;

    @Column("text")
    role: string;  // "user", "admin", etc.

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user)
    comments: Comment[];
}
