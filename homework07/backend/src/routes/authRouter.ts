import {Router, Request, Response, NextFunction} from "express";
import { AuthService } from "../services/AuthService";
import {authenticateToken} from "../middlewares/authenticator";


const authRouter = Router();
const authService = new AuthService();

authRouter.post("/register", async (req: Request, res: Response) => {
    try {
        const user = await authService.register(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const result = await authService.login(req.body.email, req.body.password);
        res.json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

authRouter.post("/logout", async (req: Request, res: Response) => {
    try {
        await authService.logout();
        res.status(200).json({ message: "Successfully logged out" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

authRouter.put("/edit", authenticateToken, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        const updatedUser = await authService.editUserProfile(userId, req.body);
        res.json(updatedUser);
        return;
    } catch (err) {
        next(err);
    }
});


export default authRouter;
