import { Router } from "express";
import { loggerTesting } from "../logs/logger.js";


const loggerTestingRoute = Router();

loggerTestingRoute.get("/", loggerTesting);

export default loggerTestingRoute