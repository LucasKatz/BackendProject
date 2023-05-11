import { Router } from "express";
import { deleteProduct, paginatedProducts, postProducts, showSpecificProduct, updateSpecifiedProduct } from "../Controllers/productsRouteDBController.js";
import { ProductManager } from "../DAO/memory/DataBaseManager.js";
import {authMiddleware} from "../auth.js";


const router = Router();
const productManager = new ProductManager(); // I should delete this, right?

router.get("/", paginatedProducts);

router.post("/",authMiddleware,postProducts);

router.delete("/:id", authMiddleware, deleteProduct);

router.put("/:id", authMiddleware, updateSpecifiedProduct);

router.get("/products/:pid", authMiddleware, showSpecificProduct)

export default router;