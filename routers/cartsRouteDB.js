import { Router } from "express";
import { CartManager } from "../DAO/Class/DataBaseManager.js";
import productModel from "../DAO/models/productsModel.js";
import cartModel from "../DAO/models/cartsModel.js";

const router = Router();
const cartManager = new CartManager();


//ruta que lee los productos que hay dentro de un carrito
router.get("/:cid", async(req, res) => {
  try {
    const findCart = await cartModel.findOne({_id:cartId}).populate('products.product')
    if(findCart !=undefined){
    res.status(200).send(findCart)
    return findCart
    }
    else{
      res.status(400).send("El Cart solicitado no existe")
    }
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

// Agrega un producto al carrito.
router.post('/:cid/product/:pid', async (req, res)=>{
  try {
      let productId = req.params.pid;
      let cartId = req.params.cid;
  
      await cartManager.update(cartId, productId);
  
      res.send({status: 'success', message: "Producto cargado con exito al carrito"});
  } catch (error) {
      res.status(404).send({status:'error', message: error.message});
  }
})



//ruta que borra el carrito completo
router.delete("/:cid", async (req, res) => {
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
  try {
  const cartId = req.params.cid;
  const productToDelete=req.params.pid
    const response = await cartManager.deleteOne(cartId,productToDelete);

    res.status(200).send({ message: "Producto Eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
});

//Actualiza productos dentro de un carrito 
router.put("/api/carts/:cid", async (req, res) => {
  const cartId  = req.params.cid;
  const product = req.body;
  try {
    const response = await cartManager.update(cartId, product);
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