import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";
import userModel from "../DAO/models/userModel.js";
import {userSignup,failRegister, loginUser, renderUser, githubLogin, githubCall, logout} from '../Controllers/sessionsRouteController.js'


const sessionsRouter = Router();
const user = new userDB();

//Registro de Nuevo Usuario

sessionsRouter.post('/',userSignup)


sessionsRouter.get('/failregister', failRegister)

// Login de usuarios.
sessionsRouter.post('/login', loginUser)

sessionsRouter.get("/", renderUser)

    res.redirect('/current');

     // Se borra la password.
    delete user.password;
    req.session.user = user[0];

    res.redirect('/current');
})

sessionsRouter.get("/", async (req,res)=>{
    if (await req.session?.user){
        const userData = await userModel.findOne({
            email: req.session.user.email
        });
        const {first_name, last_name} = userData
        res.render(userData)
        res.render("user")

        //Si esto no funciona probar res.render("products" , {first_name, last_name})
    }
        
})

//Login con Github

sessionsRouter.get('/github', githubLogin)

// Login  exitoso.
sessionsRouter.get('/githubcallback', githubCall)

sessionsRouter.get('/logout', logout)

export default sessionsRouter;