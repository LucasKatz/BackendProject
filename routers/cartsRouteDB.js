import { Router } from "express";
import { CartManager } from "../DAO/Class/DataBaseManager.js";

const router = Router();
const cartManager = new CartManager();

router.get("/", async(req, res) => {
  try {
    const cart = await cartManager.read();
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;