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


//ruta que borra el carrito completo
router.delete("/api/carts/:cid", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await cartManager.delete(id);

    res.status(200).send({ message: "Carrito eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//ruta que borra el producto seleccionado del carrito (trabajar)
router.delete("/api/carts/:cid/products/:pid", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await cartManager.delete(id);

    res.status(200).send({ message: "Carrito eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Actualiza productos dentro de un carrito (trabajar)
router.put("/api/carts/:cid", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  try {
    const response = await cartManager.update(id, product);
    res.status(200).send({ message: "Carrito actualizado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


//Actualiza stock de productos dentro de un carrito (trabajar)
router.put("/api/carts/:cid/products/:pid", async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const newStock = req.body


  try {
    const response = await cartManager.update(id, newStock);
    res.status(200).send({ message: "Carrito actualizado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;