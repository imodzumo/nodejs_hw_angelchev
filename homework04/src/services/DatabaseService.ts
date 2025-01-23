import { MongoClient, Db } from "mongodb";
import config from "config";
import logger from "../utils/logger";

const { log, error } = logger("db");

export class DatabaseService {
    private uri: string;
    private dbName: string;
    private client: MongoClient;

    constructor(uri: string, dbName: string) {
        this.uri = uri;
        this.dbName = dbName;
        this.client = new MongoClient(this.uri);
    }

    async connect(): Promise<Db> {
        try {
            await this.client.connect();
            log("Connected to MongoDB");
            return this.client.db(this.dbName);
        } catch (err) {
            error("Failed to connect to MongoDB", err.message);
            throw err;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.close();
            log("Disconnected from MongoDB");
        } catch (err) {
            error("Failed to disconnect from MongoDB", err.message);
        }
    }
}

// Use DATABASE_URL from .env if not present in config
const databaseUrl = process.env.DATABASE_URL || config.get<string>("database.url");
const databaseName = "test";
export const databaseService = new DatabaseService(databaseUrl, databaseName);
export const db = await databaseService.connect();
