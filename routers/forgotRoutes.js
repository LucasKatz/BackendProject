import { Router } from "express";
import { postForgot, renderForgot, renderReset, resetPassword } from "../Controllers/forgotRoutesController.js";


const router = Router();

router.get("/",renderForgot);

router.get ("/reset/:token", renderReset)

router.post ("/", postForgot)

router.post("/reset", resetPassword);

export default router;