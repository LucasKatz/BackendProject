import { Router } from "express";
import { ProductManager } from "../DAO/Class/DataBaseManager.js";

const router = Router();
const productManager = new ProductManager();

router.get("/", async(req, res) => {
  try {
    const product = await productManager.read();
    res.send(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;