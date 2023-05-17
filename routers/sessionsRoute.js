import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import {failRegister, renderUser, githubLogin, githubCall, logout, userSignup, loginUser} from '../Controllers/sessionsRouteController.js'
import { authMiddleware } from "../auth.js";
import changeRol from "../Controllers/userRoleControllers.js";


const sessionsRouter = Router();
const user = new userDB();

//Registro de Nuevo Usuario

sessionsRouter.post('/', userSignup)

sessionsRouter.get('/failregister', failRegister)

// Login de usuarios.
sessionsRouter.post('/login', loginUser)

sessionsRouter.get("/", authMiddleware, renderUser) //muestra ruta current


//Login con Github

sessionsRouter.get('/github', githubLogin)

// Login  exitoso.
sessionsRouter.get('/githubcallback', githubCall)

sessionsRouter.get('/logout', logout)


//Cambio de rol de Usuario

sessionsRouter.put('/premium/:id', changeRol);

export default sessionsRouter;
