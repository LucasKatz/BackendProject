import { Router } from "express";
import userModel from "../DAO/models/userModel.js";

const router = Router();

router.get("/", async (req, res) => {
    res.render("login", { style: "css/login.css" });
});

router.post("/", async (req, res) => {
    const {username, password}=req.body;
});

export default router;