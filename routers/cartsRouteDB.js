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


router.post("/", async(req, res) => {
  try {
    await cartManager.create();
    res.status(200).send("Carrito creado")
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await cartManager.delete(id);

    res.status(200).send({ message: "Carrito eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const response = await cartManager.update(id, product);
    res.status(200).send({ message: "Carrito actualizado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;