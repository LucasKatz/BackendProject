import { Router } from "express";
import { CartManager } from "../DAO/Class/DataBaseManager.js";
import { addProductToCart, deleteCart, deleteSelectedProduct, newCart, readProductsInCart, updateStockInCart } from "../Controllers/cartsRouteDBController.js";


const router = Router();
const cartManager = new CartManager();


//ruta que lee los productos que hay dentro de un carrito
router.get("/:cid", readProductsInCart);

//ruta que crea un nuevo carrito
router.post("/", newCart);

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
router.post("/:cid/products/:pid", addProductToCart);


//ruta que borra el carrito completo
router.delete("/:cid", deleteCart);

//ruta que borra el producto seleccionado del carrito 
router.delete("/:cid/products/:pid", deleteSelectedProduct);

//Actualiza productos dentro de un carrito 
router.put("/:cid", updateProductInCart);


//Actualiza stock de productos dentro de un carrito 
router.put("/:cid/products/:pid", updateStockInCart);

//ruta que permite finalizar la compra de los productos de un carrito
router.post("/:cid/purchase", finalizarCompra)

export default router;