import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./UserModel";
import { Comment } from "./CommentModel";

@Entity("posts")
export class Post {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("text")
    title: string;

    @Column("text")
    content: string;

    @Column({
        type: "enum",
        enum: ["draft", "published", "archived"],
        default: "draft",
    })
    status: string;

    @Column("integer")
    authorId: number;

    @ManyToOne(() => User, (user) => user.posts, { onDelete: "CASCADE" })
    @JoinColumn({ name: "authorId" })
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP", onUpdate: "CURRENT_TIMESTAMP" })
    updatedAt: Date;
}
