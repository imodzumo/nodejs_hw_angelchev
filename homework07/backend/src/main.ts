import "dotenv/config";
import "reflect-metadata";
import config from "config";
import express, { Request, Response, NextFunction } from "express";
import { databaseService } from "./services/DatabaseService";
import authRouter from "./routes/authRouter";
import userRouter from "./routes/userRouter";
import postRouter from "./routes/postRouter";
import commentRouter from "./routes/commentRouter";
import cors from "cors";



const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);
app.use("/api/v1/comments", commentRouter);

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).json({ error: err.message });
});

// Start the Server
app.listen(PORT, HOSTNAME, () => {
    console.log(`Server is running on http://${HOSTNAME}:${PORT}`);
});

// Handle graceful shutdown
process.on("SIGINT", handleShutdown);
process.on("SIGTERM", handleShutdown);

async function handleShutdown(signal: string): Promise<void> {
    console.log(`Received ${signal}. Closing PostgreSQL connection...`);
    await databaseService.disconnect();
    console.log(`${signal} handled. Exiting process.`);
    process.exit(0);
}
