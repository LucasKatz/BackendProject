import { Router } from "express";
import { authAdminMiddleware } from "../auth.js";
import { paginatedUsers } from "../Controllers/adminRouteController.js";

const adminRouter = Router();

adminRouter.get("/listOfUsers", paginatedUsers )

adminRouter.delete ("/deleteUser", authAdminMiddleware,)



export default adminRouter 