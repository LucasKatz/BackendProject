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

sessionsRouter.post("/",
passport.authenticate('signup', {failureRedirect:'/failregister'}), 
async (req, res)=>{
    
    try{
    res.status(201).json({message:"Usuario Creado"})
}catch (error) {
res.status(500).json({error:error.message})
}
});

export default sessionsRouter;