import { Router } from "express";
import userModel from "../DAO/models/userModel.js";
import { renderSignup, signupUserRoute } from "../Controllers/singupRouteController.js";
import passport from "passport";


const sessionsRouter = Router();
const user = new userModel();

sessionsRouter.get("/",renderSignup);

sessionsRouter.post("/", signupUserRoute);
// passport.authenticate('signup', {failureRedirect:'/failregister'}),

export default sessionsRouter;