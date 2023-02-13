import { Router } from "express";
import { CartManager } from "../DAO/Class/DataBaseManager.js";
import productModel from "../DAO/models/productsModel.js";

const router = Router();
const cartManager = new CartManager();


//ruta que lee los productos que hay dentro de un carrito
router.get("/", async(req, res) => {
  try {
    const cart = await cartManager.read();
    res.send(cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//ruta que crea un nuevo carrito
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

//ruta que borra el producto seleccionado del carrito 
router.delete("/api/carts/:cid/products/:pid", async (req, res) => {
  const { id } = req.params;
  try {
    const response = await cartManager.deleteOne(id);

    res.status(200).send({ message: "Producto Eliminado", response });
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


//Actualiza stock de productos dentro de un carrito 
router.put("/api/carts/:cid/products/:pid", async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    await cartManager.updateProductInCart(cartId, productId, quantity);

    res.status(200).send({ message: "Stock actualizado", response });
} catch (error) {
    console.log(error.message);
    res.status(404).send({status:'error', message: error.message});
}
});

export default router;