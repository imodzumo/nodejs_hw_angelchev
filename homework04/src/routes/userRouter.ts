import { userService } from "../services/UserService";
import { Router, Request, Response } from "express";

const userRouter = Router();

userRouter.get("/", async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
});

userRouter.get("/:id", async (req: Request, res: Response) => {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
});

userRouter.post("/", async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
});

userRouter.put("/:id", async (req: Request, res: Response) => {
    const updatedUser = await userService.updateUser(req.params.id, req.body);
    res.json(updatedUser);
});

userRouter.delete("/:id", async (req: Request, res: Response) => {
    const success = await userService.deleteUser(req.params.id);
    res.json({ success });
});

export default userRouter;
