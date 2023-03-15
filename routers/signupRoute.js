import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";
import userModel from "../DAO/models/userModel.js";

const sessionsRouter = Router();
const user = new userDB();

//Registro de Nuevo Usuario
sessionsRouter.get('/',  (req, res)=>{ 
    res.render("signup");
})


sessionsRouter.post('/signup',passport.authenticate('signup', {failureRedirect:'/failregister'}), async (req, res)=>{
    const userToBeAdded = req.body;
    let user = await userDB.addUser(userToBeAdded);
    res.redirect("/login");
})

sessionsRouter.get('/failregister', async (req, res)=>{ 
    console.log('Ha habido un error. Por favor intente nuevamente')
    res.send({errro:'Falla al Registrarse'})
})


export default sessionsRouter;