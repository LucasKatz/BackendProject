import { Router } from "express";
import { deleteProduct, paginatedProducts, postProducts, showSpecificProduct, updateSpecifiedProduct } from "../Controllers/productsRouteDBController.js";
import { ProductManager } from "../DAO/memory/DataBaseManager.js";
import {authMiddleware} from "../auth.js";


const router = Router();

router.get("/", paginatedProducts);

router.post("/",postProducts);

router.delete("/:id", authMiddleware, deleteProduct);

router.put("/:id",  updateSpecifiedProduct); //falta authMiddleware

router.get("/products/:pid", authMiddleware, showSpecificProduct)

export default router;