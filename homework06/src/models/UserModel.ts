import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Post } from "./PostModel";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("increment")
    id: number;

    @Column("text")
    name: string;

    @Column("text")
    email: string;

    @Column("integer")
    age: number;

    @OneToMany(() => Post, (post) => post.author)
    posts: Post[];
}


