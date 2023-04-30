import { Router } from "express";
import { postForgot, renderForgot, renderReset, resetPassword } from "../Controllers/forgotRoutesController.js";


const router = Router();

router.get("/",renderForgot);

router.get ("/", renderReset)

router.post ("/", postForgot)

router.post("/", resetPassword);

export default router;