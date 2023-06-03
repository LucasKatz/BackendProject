import { Router } from "express";
import {authMiddleware} from "../auth.js"
import { getTicketModel, getSpecificTicket, createTicket, updateTicket, deleteTicket } from "../Controllers/ticketRouteController.js";

const ticketRouter = Router();

ticketRouter.get("/", authMiddleware,getTicketModel);

ticketRouter.get("/:id", authMiddleware, getSpecificTicket);

ticketRouter.post("/:cid/purchase", authMiddleware, createTicket);

ticketRouter.put("/",authMiddleware,updateTicket);

ticketRouter.delete("/:id", authMiddleware, deleteTicket);

export default ticketRouter;