import { Router } from "express";
import { createMockProducts } from "../Controllers/mockRouteController";


const router = Router();

router.get("/mockingproducts", createMockProducts);





export default router;