import logger from "../utils/logger";
import "reflect-metadata";
import { appDataSource } from "./appDataSource";
import { DataSource } from "typeorm";

const { log, error } = logger("db");

export class DatabaseService {
    private dataSource!: DataSource;

    async connect(): Promise<DataSource> {
        try {
            if (!this.dataSource || !this.dataSource.isInitialized) {
                this.dataSource = await appDataSource.initialize();
                log("Connected to PostgreSQL");
            }
            return this.dataSource;
        } catch (err) {
            error("Failed to connect to PostgreSQL");
            throw err;
        }
    }

    async disconnect(): Promise<void> {
        try {
            if (this.dataSource && this.dataSource.isInitialized) {
                await this.dataSource.destroy();
                log("Disconnected from PostgreSQL");
            }
        } catch (err) {
            error("Failed to disconnect from PostgreSQL");
        }
    }
}

export const databaseService = new DatabaseService();
databaseService.connect();
