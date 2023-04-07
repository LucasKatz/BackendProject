import { Router } from "express";
import { deleteProduct, paginatedProducts, postProducts, updateSpecifiedProduct } from "../Controllers/productsRouteDBController.js";
import { ProductManager } from "../DAO/memory/DataBaseManager.js";
import productModel from "../DAO/models/productsModel.js";
import authMiddleware from "../auth.js";


const router = Router();
const productManager = new ProductManager(); // I should delete this, right?

router.get("/", authMiddleware, paginatedProducts);

router.post("/",authMiddleware,postProducts);

router.delete("/:id", authMiddleware, deleteProduct);

router.put("/:id", authMiddleware, updateSpecifiedProduct);

export default router;