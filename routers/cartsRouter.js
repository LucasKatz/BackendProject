const express = require("express");
const routerCarts = express.Router();




routerCarts.post("/", (req, res) => {
    let cart = [] //Aca de verdad no entiendo como "crear" el carrito, se refiere a que me tiene que crear un archivo JSON o crear un nuevo array vacio a través de una función?
  res.send("Carrito creado");
});


routerCarts.get("/:cid", (req, res) => {
    const carritoId = req.params.cid;

    const searchInCart = cart.find(product => product.cid === cid) //asi el find??

    if (searchInCart == undefined) {
      console.log( "Product not found")
    }
    else {

      return searchInCart 
    }
});


routerCarts.post("/:cid/product/:pid", (req, res) => {
    const carritoId = req.params.cid;
    const productoId = req.params.pid;
  // agregar el producto al carrito

    let carrito = this.readFile(cart); //asi va a leer lo que hay en el array, no? O como tengo que hacer ?
    const checkInCart = carrito.find(p => p.code === product.code)

    if (!product.title || !product.description || !product.price ||
        
        !product.thumbnail || !product.code || !product.stock) {
            
            throw new Error('Todos los campos son obligatorios'); 
        } else if (checkInCart){
            console.log("ERROR - Please check the information and try again")
        }
    else {
        
        
        carrito.id = listado.length > 0 ? listado[listado.length - 1].id + 1 : 1;
        carrito.id.push(product.id)
        this.writeData(carrito)
                         
    }
}

);

module.exports = {
  routerCarts,
};