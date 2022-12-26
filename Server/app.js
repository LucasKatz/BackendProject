const express = require ('express')
const app = express()
const ProductManager = require ('../desafio3')
const productManager = new ProductManager('../database/productos.JSON')

app.get ('/products', async (req,res)=>{
const products = await productManager.getProducts();
const {limit} = req.query
if (limit) return res.json(products.slice(0,limit))
else return res.json(products)
})

app.get ('/products/pid', async (req,res)=>{
    const products = await productManager.getProducts();
    const {pid} = req.params
    const product = product.find (products => products.id === id)
})

app.listen(3000, () => {

})