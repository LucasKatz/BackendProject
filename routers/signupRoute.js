import { Router } from "express";
import userModel from "../DAO/models/userModel.js";
import { createHash } from "../utils.js";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";
import { renderSignup, signupUserRoute } from "../Controllers/singupRoute.js";


const sessionsRouter = Router();
const user = new userDB();

sessionsRouter.get("/",renderSignup);

sessionsRouter.post('/signup', signupUserRoute);

export default sessionsRouter;