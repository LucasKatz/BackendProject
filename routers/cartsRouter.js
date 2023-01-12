const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");

const cartDB = JSON.parse(fs.readFileSync('./database/cart.JSON', 'utf-8'))


routerCarts.post("/", (req, res) => {
  /* Se debe crear solo la logica y estructura del carrito (id y products con array vacio), luego la logica de pushear y escribir el cart.json con fs. El envio del producto se hace en el otro endpoint de post.
  */
    let cart = {
      id: cart.length == 0 ? 1 : cart.length + 1,
      product: []
    }

    cartDB.push(cart)
    fs.writeFileSync('Cart.JSON', JSON.stringify('cartDb',null))
    res.send("Carrito creado");
});


routerCarts.get("/:cid", (req, res) => {
    const carritoId = req.params.cid;

    const searchInCart = cartDB.find(product => product.id === Number(req.params.cid)) 

    if (searchInCart == undefined) {
      console.log( "Product not found")
    }
    else {

      res.send(searchInCart)  
    }
});


routerCarts.post("/:cid/product/:pid", (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
  // agregar el producto al carrito
    productoId.push(carritoId)


    const productPost = 
    {
        'id': productoId,
        'quantity': 1
    }

    const checkInCart = cartDB.find(p => p.code === +carritoId)

    //Verificar si el id devuelve checkInCart coincide con el productPost
    const verify1 = checkInCart.products.find(product=>product.id===productPost)

    //Verificar si hay un producto que coincida con productoId para luego sumar la cantidad si existe
    
    const verify2 = checkInCart.products.find(product=>product === productoId)

    //Un if de que en el caso que exista productoId, sumarle la cantidad sino pushear productoPost
    if(productoId){
      productoId.quantity++
    }else{
      checkInCart.products.push(productPost);
    }

    //Luego escribir en el cart.json con fs pasandole el cartDb

    fs.writeFileSync ('Cart.JSON', JSON.stringify('cartDb',null))

    //Enviar por res una respuesta
    res.send("Producto Agregado")
    

}

);

module.exports =  routerCarts
