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
/*router.post('/:cid/product/:pid', async (req, res)=>{
  try {
      let productId = req.params.pid;
      let cartId = req.params.cid;
  
      await cartManager.update(cartId, productId);
  
      res.send({status: 'success', message: "Producto cargado con exito al carrito"});
  } catch (error) {
      res.status(404).send({status:'error', message: error.message});
  }
})*/


//RUTA POST QUE AGREGA PRODUCTO A CARRITO CON EL FORMATO PEDIDO EN DIAPOS

// La ruta api/carts/:cid/products/:pid (método post) agrega un producto a un carrito
router.post("/:cid/products/:pid", async (req, res) => {
  const  cartId  = req.params.cid;
  const productId = req.params.pid
  const {quantity} = req.body;

  //Comprobación de la estructura y validez de la Id de producto y la Id del carrito recibidos por parámetro
  if(productId.trim().length!=24)
  { 
    res.status(400).send({error: "La Id de producto ingresada no es válida"})
    return
  }
  else if(cartId.trim().length!=24){
    res.status(404).send({error: "La Id del Cart ingresada no es válida"})
    return
  }
  const productExist = await productModel.findById(productId)
  const cartExist = await cartModel.findById(cartId)

  if(productExist==null){
    res.status(400).send({error:"No existe un producto con la Id ingresada"})
    return
  }
  else if(cartExist==null){
    res.status(404).send({error:"No existe un Cart con la Id ingresada"})
    return
  }

  //Comprobación de stock
  let checkStock = productExist.stock
  if(parseInt(quantity)>checkStock){
    res.status(400).send({status:"Error", message:"No hay stock suficiente"})
  return
  }

  //Si se comprueba la validez de los parámetros se ejecutan las acciones para agregar el producto al carrito
  try {
    let selectedCart = await cartModel.find({_id: cartId})
    let productExistInCart = selectedCart[0].products.find((product)=>product.product == productId)

    if(productExistInCart == undefined){
      selectedCart[0].products.push({product: productId, quantity: quantity})
    }
    else{
      let newQuantity = productExistInCart.quantity + quantity
      let productIndex = selectedCart[0].products.findIndex((product)=> product.product == productId)
      selectedCart[0].products[productIndex].quantity = newQuantity
    }

    let result = await cartModel.updateOne({_id:cartId,},selectedCart[0])


    res.status(200).send({ message: "Producto agregado al carrito", selectedCart });
  } catch (err) {
    res.status(500).send(err.message);
  }
});


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