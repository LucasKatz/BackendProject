import { Router } from "express";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";

const sessionsRouter = Router();
const user = new userDB();

//Registro de Nuevo Usuario

sessionsRouter.post('/signup',passport.authenticate('signup', {failureRedirect:'/failregister'}), async (req, res)=>{
    const userToBeAdded = req.body;
    let user = await userDB.addUser(userToBeAdded);
    res.redirect("/login");
})

sessionsRouter.get('/failregister', async (req, res)=>{ 
    console.log('Ha habido un error. Por favor intente nuevamente')
    res.send({errro:'Falla al Registrarse'})
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
    
    res.redirect('/api/productsDB');

    // Se borra la password.
    delete user.password;
    req.session.user = user[0];

    res.redirect('/api/productsDB');
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