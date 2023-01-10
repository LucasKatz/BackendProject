const express = require("express");
const routerProducts = express.Router();

const fs = require ('fs')

class ProductManager {
    constructor(path) {
      this.path = path;
      this.products = this.readFile();
    }
  
    readFile() {

        try {
        
        const data = JSON.parse(fs.readFileSync(`./${this.path}`, "utf-8"));
        
        return data;
        
        } catch (error) {
        
        return []
        
        }
        
        }
}

routerProducts.get("/", (req, res) => {
  // Traer listado de productos (incluyendo limite)
  const products = productManager.getProducts();
  const {limit} = req.query
  if (limit) return res.json(products.slice(0,limit))
  else return res.json(products).send("Listado de Productos")
});


routerProducts.get("/:pid", (req, res) => {
    const productsId = req.params.pid;
  // Traer producto especifico filtrado x ID

    let listaProductos = this.readFile();
    const products = listaProductos
    

  const searchProduct = products.find(product => product.pid === pid) //asi el find??

if (searchProduct == undefined) {
  console.log( "Product not found")
}
else {
  return searchProduct 
}

});



routerProducts.post("/", (req, res) => { //esta bien esa ruta?? o tengo que agregarle algo mas despues de /
  
  // agregar el producto al carrito (chequear formato)
});

routerProducts.put("/:pid", (req, res) => {
    const productsId = req.params.pid;
  // Traer producto especifico filtrado x ID y actualizarlo (utilizar updateProducts)
  updateProduct=(id, product)=>{
  
    let data = this.readFile ();
    if(data.find(product=>product.id===id)){
        let productDeleted = data.filter(product => product.id!==id)
        product.id=id;
        productDeleted.push(product);
        this.writeData(productDeleted);
        return productDeleted;

    }
    else{
        console.log('The product to be updated does not exist')
    }
}
});

routerProducts.delete("/:pid", (req, res) => {
    const productsId = req.params.pid;
  // Traer producto especifico filtrado x ID y eliminarlo
  deleteProduct  = (id) => {
    let productos =  this.readFile() 
    try {
       productos = productos.filter (producto =>producto.id != id )
    this.writeData(productos)
        
    } catch (err) {
        console.log("Oops! There has been a mistake")
    }
}
});

module.exports = {
    routerProducts,
};