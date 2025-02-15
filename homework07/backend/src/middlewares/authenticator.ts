import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "your-secret-key";

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        res.status(401).json({ error: "Access denied" });
        return;
    }

    jwt.verify(token, JWT_SECRET_KEY, (err, decoded: any) => {
        if (err) {
            res.status(403).json({ error: "Invalid token" });
            return;
        }

        req.user = { userId: decoded.userId, role: decoded.role };
        next();
    });
}
