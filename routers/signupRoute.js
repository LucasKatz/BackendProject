import { Router } from "express";
import userModel from "../DAO/models/userModel.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render("signup", { style: "css/signup.css" });
});

router.post("/", async (req, res) => {
    const {username, password}=req.body;
});

export default router;