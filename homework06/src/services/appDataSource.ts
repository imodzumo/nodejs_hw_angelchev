import { DataSource } from "typeorm";
import { User } from "../models/UserModel";
import { Post } from "../models/PostModel";
import "dotenv/config";


export const appDataSource = new DataSource({
    type: "postgres",
    host: process.env.POSTGRES_HOST || "db",
    port: Number(process.env.POSTGRES_PORT) || 5432,
    username: process.env["POSTGRES_USER"],
    password: process.env["POSTGRES_PASSWORD"],
    database: process.env["POSTGRES_DB"],
    synchronize: true,
    logging: true,
    entities: [User, Post],
    subscribers: [],
    migrations: [],
})

