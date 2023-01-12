const express = require("express");
const routerProducts = express.Router();
const {newProd} = require('../Desafio2')
const fs = require ('fs')



routerProducts.get("/", (req, res) => {
    const products = newProd.getProducts();
    const {limit} = req.query
    if (limit) return res.json(products.slice(0,limit))
    else return res.json(products)
});


routerProducts.get("/:pid", (req, res) => {
    const {pid} = req.params
    const products = newProd.getProductsById(Number(pid));

    if (products) return res.status(200).json(products)
    else return res.status(404).json({message:'Product not found'});

});



routerProducts.post("/", (req, res) => {

    const producto = req.body
    const productoNuevo = newProd.addProducts(producto)

    res.json({producto})

});

routerProducts.put("/:pid", (req, res) => {
    const productsId = req.params.pid;
    //Traigo lo que recibe de body
    const productBody = req.body

    // Usar el metodo updateProduct y pasarle el id y producto recibido por req.body 
    const productUpdated = newProd.updateProduct(id, body)

    //Enviar por res el producto actualizado
    res.json({productUpdated})
    

});

routerProducts.delete("/:pid", (req, res) => {
    const productsId = req.params.pid;

    // Usar el metodo deleteProduct y pasarle el id de params 
    newProd.deleteProduct(req.params.pid)

    //Enviar por res una respuesta que fue eliminado
    res.send("Producto Eliminado")
});

module.exports = routerProducts
