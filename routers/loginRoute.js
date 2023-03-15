import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";
import userModel from "../DAO/models/userModel.js";
import { isValidPassword } from "../utils.js";

const sessionsRouter = Router();
const user = new userDB();

sessionsRouter.get('/',  (req, res)=>{ 
    res.render("login");
})

// Login de usuarios.
sessionsRouter.post('/login', passport.authenticate('login', {failureRedirect: 'faillogin'}), (req, res)=>{
    // Si no se encuentra al  usuario...
    if(user.length === 0){
    return res.redirect("/signup");
}

    req.session.user = {
        first_name: req.user.first_name,
        last_name: req.user.last_name,
        age: req.user.age,
        email: req.user.email
    }

    res.redirect('/current');

     // Se borra la password.
    delete user.password;
    req.session.user = user[0];

    res.redirect('/current');
})

sessionsRouter.get("/current", async (req,res)=>{
    if (await req.session?.user){
        const userData = await userModel.findOne({
            email: req.session.user.email
        });
        const {first_name, last_name} = userData
        res.render("user")

        //Si esto no funciona probar res.render("products" , {first_name, last_name})
    }
        
})

//Login con Github

sessionsRouter.get('/github', passport.authenticate('github', {scope:['user:email']}), (req, res)=>{})

// Login  exitoso.
sessionsRouter.get('/githubcallback', passport.authenticate('github', {failureRedirect:'/login'}), (req, res)=>{
    req.session.user = req.user;

    res.redirect('/products');
})

sessionsRouter.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if(err) res.send({status:'error', message:'Error al cerrar la sesión: '+err});

        res.redirect('/login');
    });
})

export default sessionsRouter;