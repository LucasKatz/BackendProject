import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import {failRegister, renderUser, githubLogin, githubCall, logout, userSignup, loginUser} from '../Controllers/sessionsRouteController.js'


const sessionsRouter = Router();
const user = new userDB();

//Registro de Nuevo Usuario

sessionsRouter.post('/', userSignup)


sessionsRouter.get('/failregister', failRegister)

// Login de usuarios.
sessionsRouter.post('/login', loginUser)

sessionsRouter.get("/", renderUser)


//Login con Github

sessionsRouter.get('/github', githubLogin)

// Login  exitoso.
sessionsRouter.get('/githubcallback', githubCall)

sessionsRouter.get('/logout', logout)

export default sessionsRouter;
