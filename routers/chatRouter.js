import { Router } from "express";
import { renderChat } from "../Controllers/chatRouteController";

const router = Router();

router.get("/", renderChat );

export default router;