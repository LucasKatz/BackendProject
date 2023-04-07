import { Router } from "express";
import authMiddleware from "../auth.js";
import { renderChat } from "../Controllers/chatRouteController.js";

const router = Router();

router.get("/", authMiddleware, renderChat );

export default router;