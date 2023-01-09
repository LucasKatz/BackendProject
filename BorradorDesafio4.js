const express = require ('express');
const app = express ();

app.get ('/api/products', async (req,res)=>{
    const products = await productManager.getProducts();
    const {limit} = req.query
    if (limit) return res.json(products.slice(0,limit))
    else return res.json(products)
    })
    
    app.get ('/api/products/:pid', async (req,res)=>{
        const products = await productManager.getProducts();
        const {pid} = req.params
        const product = products.find (products => products.id === parseInt(pid))
    
        if (product) return res.status(200).json(product)
        else return res.status(404).json({message:'Product not found'});
    })
    

app.post ('/products', async (req,res)=>{    
    const products = await productManager.addProducts();
})


app.put("/products/:id", (req, res) => {
    compraId = compras.findIndex((c) => c.id === +req.params.id);
    compras[compraId] = {
      id: req.params.id,
      nombre: req.body.nombre,
    };
    res.send("Producto actualizado!");
  });

app.delete("/products/:id", (req, res) => {
    compras = compras.filter((c) => c.id !== +req.params.id);
    res.send("Producto eliminado");
  });