import { Router } from "express";
import createMockProducts from '../Controllers/mockRouteController.js'


const Mockrouter = Router();

Mockrouter.get("/", createMockProducts);

export default Mockrouter;