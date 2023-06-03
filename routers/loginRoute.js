import { Router } from "express";
import { postLogin, renderLogin } from "../Controllers/loginRoutecontroller.js";
import passport from "passport";


const router = Router();

router.get("/", renderLogin);

router.post("/",postLogin);

export default router;