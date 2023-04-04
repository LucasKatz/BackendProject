import { Router } from "express";
import { getMessages, saveMessages } from "../Controllers/messageRouterController.js";
import { messageModel } from "../DAO/models/chatModel.js";
import authMiddleware from "../auth.js";

const router = Router();

router.get("/", authMiddleware(), getMessages);

router.get("/", authMiddleware(), saveMessages);
export default router;