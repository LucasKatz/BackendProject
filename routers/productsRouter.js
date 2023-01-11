const express = require("express");
const routerProducts = express.Router();
const {newProd} = require("../Desafio2")

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
  newProd.getProducts
});


routerProducts.get("/:pid", (req, res) => {
    const productsId = req.params.pid;
  // Traer producto especifico filtrado x ID

newProd.getProducts

});



routerProducts.post("/", (req, res) => {  //esta bien esa ruta?? o tengo que agregarle algo mas despues de /
  
  newProd.addProducts
  //aca faltan agregar campos al archivo index2
});

routerProducts.put("/:pid", (req, res) => {
    const productsId = req.params.pid;
  // Traer producto especifico filtrado x ID y actualizarlo (utilizar updateProducts)
  newProd.updateProduct
});

routerProducts.delete("/:pid", (req, res) => {
newProd.deleteProduct
});
module.exports = {
    routerProducts,
};