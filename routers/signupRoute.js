import { Router } from "express";
import userModel from "../DAO/models/userModel.js";
import { createHash } from "../utils.js";
import userDB from "../DAO/models/userModel.js";
import passport from "passport";


const sessionsRouter = Router();
const user = new userDB();
sessionsRouter.get("/", async (req, res) => {
    res.render("signup");
});

sessionsRouter.post('/signup',passport.authenticate('signup', {failureRedirect:'/failregister'}), async (req, res)=>{
    const {first_name, last_name, email, password, age}=req.body;
    try{
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password: createHash(password),
        age,
        rol,
        cart
    })
    await newUser.save() 
    res.status(201).json({message:"Usuario creado", data:newUser})
}catch (error) {
res.status(500).json({error:error.message})
}
});

export default sessionsRouter;