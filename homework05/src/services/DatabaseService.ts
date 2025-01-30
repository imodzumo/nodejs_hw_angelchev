import mongoose, {Mongoose} from 'mongoose';
import config from "config";
import logger from "../utils/logger";

const { log, error } = logger("db");

export class DatabaseService {
    private uri: string;
    private dbName: string;
    private client: Mongoose;

    constructor(uri: string, dbName: string) {
        this.uri = uri;
        this.dbName = dbName;
    }

    async connect(): Promise<Mongoose> {
        try {
            this.client = await mongoose.connect(this.uri, {dbName: this.dbName})
            log("Connected to Database");
            return this.client;
        } catch (err) {
            error("Failed to connect to Database");
            throw err;
        }
    }

    async disconnect(): Promise<void> {
        try {
            await this.client.disconnect();
            log("Disconnected from Database");
        } catch (err) {
            error("Failed to disconnect from Database");
        }
    }
}

const databaseUrl = process.env.DATABASE_URL || config.get<string>("database.url");
const databaseName = "test";
export const databaseService = new DatabaseService(databaseUrl, databaseName);
const db = databaseService.connect();
