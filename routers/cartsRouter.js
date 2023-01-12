const express = require("express");
const routerCarts = express.Router();
const fs = require("fs");

const cartDB = JSON.parse(fs.readFileSync('./database/cart.JSON', 'utf-8'))


routerCarts.post("/", (req, res) => {
    let cart = [] //Aca de verdad no entiendo como "crear" el carrito, se refiere a que me tiene que crear un archivo JSON o crear un nuevo array vacio a través de una función?
  res.send("Carrito creado");

  /* Se debe crear solo la logica y estructura del carrito (id y products con array vacio), luego la logica de pushear y escribir el cart.json con fs. El envio del producto se hace en el otro endpoint de post.

    let cart = {
      id: logica para el id,
      product: []
    }

    xxxxxx.push(cart)
    fs.writeFileSync___________
    res.________

  */
});


routerCarts.get("/:cid", (req, res) => {
    const carritoId = req.params.cid;

    const searchInCart = cartDB.find(product => product.id === cid) //asi el find?? *** debe ser product.id e igualar al id de params y que sea Number***

    if (searchInCart == undefined) {
      console.log( "Product not found")
    }
    else {

      return searchInCart  //Enviar por res la respuesta.
    }
});


routerCarts.post("/:cid/product/:pid", (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
  // agregar el producto al carrito

    //asi va a leer lo que hay en el array, no? O como tengo que hacer ?
    const productPost = 
    {
        'id': productoId,
        'quantity': 1
    }

    const checkInCart = cartDB.find(p => p.code === +carritoId)

    //Verificar si el id devuelve checkInCart coincide con el productPost

    //Verificar si hay un producto que coincida con productoId para luego sumar la cantidad si existe

    //Un if de que en el caso que exista productoId, sumarle la cantidad sino pushear productoPost

    //Luego escribir en el cart.json con fs pasandole el cartDb

    //Enviar por res una respuesta

    

}

);

module.exports =  routerCarts
