import { Router } from "express";
import { renderThanks } from "../Controllers/thankyouController.js";

const Thnxrouter = Router();

Thnxrouter.get("/", renderThanks);

export default Thnxrouter;