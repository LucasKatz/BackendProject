import { Router } from "express";
import userModel from "../DAO/models/userModel.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render("signup", { style: "css/signup.css" });
});

router.post("/", async (req, res) => {
    const {first_name, last_name, email, password, age}=req.body;
    try{
    const newUser = new userModel({
        first_name,
        last_name,
        email,
        password,
        age,
    })
    res.status(201).json({message:"Usuario creado", data:newUser})
}catch (error) {
res.status(500).json({error:error.message})
}
});

export default router;