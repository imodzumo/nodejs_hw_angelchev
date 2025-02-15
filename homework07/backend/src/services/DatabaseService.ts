import { DataSource } from "typeorm";
import { appDataSource } from "./appDataSource";

export class DatabaseService {
    private dataSource: DataSource;

    constructor() {
        this.dataSource = appDataSource;
    }

    async connect() {
        try {
            if (!this.dataSource.isInitialized) {
                await this.dataSource.initialize();
                console.log("Database connection established");
            }
        } catch (err) {
            err("Failed to connect to the database", err.message);
            throw err;
        }
    }

    async disconnect() {
        try {
            if (this.dataSource.isInitialized) {
                await this.dataSource.destroy();
                console.log("Database connection closed");
            }
        } catch (err) {
            err("Failed to close the database connection", err.message);
        }
    }
}

export const databaseService = new DatabaseService();
databaseService.connect();
