import config from "config";
// @ts-ignore
import express, { Request, Response, NextFunction } from "express";
import logger from "./utils/logger";
import httpLogger from "./middleware/httpLogger";

const { log, warn, error } = logger("main");


const app = express();
const PORT = config.get("app.port");
const HOSTNAME = config.get("app.hostname");

// Middleware for logging HTTP requests
app.use(httpLogger);

// Routes
app.get("/", (req: Request, res: Response) => {
    res.send("Hello, World!");
});

app.get("/healthcheck", (req: Request, res: Response) => {
    res.json({
        live: true,
        timestamp: new Date().toISOString(),
    });
});

// Global Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    error("Error:", err.message);
    res.status(500).json({ error: err.message });
});

// Start the Server
app.listen(PORT, HOSTNAME, () => {
    log(`Server is running on http://${HOSTNAME}:${PORT}`);
});
