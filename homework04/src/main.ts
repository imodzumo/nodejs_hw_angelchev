import "dotenv/config";
import config from "config";
import express, { Request, Response, NextFunction } from "express";
import logger from "./utils/logger";
import httpLogger from "./middleware/httpLogger";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import { databaseService } from "./services/DatabaseService";

const { log, warn, error } = logger("main");


const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

// Middleware for logging HTTP requests
app.use(express.json());
app.use(httpLogger);

// Routes
// Use routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    error("Error:", err.message);
    res.status(500).json({ error: err.message });
});

// Start the Server
app.listen(PORT, HOSTNAME, () => {
    log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

async function handleShutdown(signal: string): Promise<void> {
    log(`Received ${signal}. Closing MongoDB connection...`);
    await databaseService.disconnect();
    log(`${signal} handled. Exiting process.`);
    process.exit(0);
}
