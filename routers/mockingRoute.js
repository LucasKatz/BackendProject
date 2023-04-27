import { Router } from "express";
import createMockProducts from '../Controllers/mockRouteController.js'


const Mockrouter = Router();

Mockrouter.get("/mockingproducts", createMockProducts);





export default Mockrouter;