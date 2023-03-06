import { Router } from "express";
import userDB from "../DAO/models/userModel.js";

const sessionsRouter = Router();


const user = new userDB();

sessionsRouter.post('/register', async (req, res)=>{
    const userToBeAdded = req.body;

    let user = await userDB.addUser(userToBeAdded);

    res.redirect("/login");
})

sessionsRouter.post("/login", async (req, res)=>{
    let username = req.body.email;
    let password = req.body.password;

    // Busqueda de usuario.
    let user = await userDB.findUser(username,password);

    // Si no se encuentra al  usuario...
    if(user.length === 0){
        return res.redirect("/signup");
    }

    // Se borra la password.
    delete user.password;
    req.session.user = user[0];

    res.redirect('/api/productsDB');
})

sessionsRouter.get('/logout', (req, res)=>{
    req.session.destroy(err=>{
        if(err) res.send({status:'error', message:'Error al cerrar la sesión: '+err});

        res.redirect('/login');
    });
})

export default sessionsRouter;