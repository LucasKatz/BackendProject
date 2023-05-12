import { changeRol } from "../Controllers/premiumRol.js";
import { Router } from "express";

const premiumRouter = Router();

premiumRouter.post('/premium/:uid', changeRol)

export default premiumRouter