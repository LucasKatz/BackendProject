import { Router } from "express";
import {authMiddleware} from "../auth.js"
import { getTicketModel, getSpecificTicket, createTicket, updateTicket, deleteTicket } from "../Controllers/ticketRouteController.js";
import { sendEmail } from "../Controllers/submitController.js";

const ticketRouter = Router();

ticketRouter.get("/ticketModel", authMiddleware,getTicketModel);

ticketRouter.get("/:id", authMiddleware, getSpecificTicket);

ticketRouter.post("/:cid/purchase-redirect",  createTicket);

ticketRouter.put("/update",authMiddleware,updateTicket);

ticketRouter.delete("/:id", authMiddleware, deleteTicket);

ticketRouter.post("/send-email", sendEmail)

export default ticketRouter;