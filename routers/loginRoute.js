import { Router } from "express";
import userModel from "../DAO/models/userModel.js";

const  admin = { 
    username: "adminCoder@coder.com",
    password: "adminCod3r123"
}

const router = Router();

router.get("/", async (req, res) => {
    res.render("login");
});

router.post("/", async (req, res) => {
    const {username, password}=req.body;
    try{
        const response = await userModel.findOne({email:username, password:password});
        if(response == admin) {
            req.session.user = {
                first_name: req.user.first_name,
                last_name: req.user.last_name,
                age: req.user.age,
                email: req.user.email,
                rol: admin
            }
            res.status(200).json({message:"logged in", data:response})
    } else if (response){
        req.session.user = {
            first_name: req.user.first_name,
            last_name: req.user.last_name,
            age: req.user.age,
            email: req.user.email,
            rol: user
        }
        res.status(200).json({message:"logged in", data:response})
    }else {
        res.status(400).json({message:"error", data:"Usuario no encontrado"})
    }
    }catch (error){
        res.status(500).json({error:error.message})
    }
});

export default router;