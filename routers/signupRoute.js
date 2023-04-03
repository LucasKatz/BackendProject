import { Router } from "express";
import userModel from "../DAO/models/userModel.js";
import { renderSignup, signupUserRoute } from "../Controllers/singupRouteController.js";


const sessionsRouter = Router();
const user = new userModel();

sessionsRouter.get("/",renderSignup);

sessionsRouter.post("/", signupUserRoute);

export default sessionsRouter;