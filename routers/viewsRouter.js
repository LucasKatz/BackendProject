const express = require("express");
const viewsRouter = express.Router();
const fs = require ('fs')

viewsRouter.get ("/", async (req, res) => { 
    const products = await readFile(); //agrego archivo como parametro entre ()? el JSON o el handlebars?
    res.render("home", {products} );
});

viewsRouter.get('/realtimeproducts', async (req, res)=>{
    let products = fs.writeFileSync()//agrego archivo como parametro entre ()? el JSON o el handlebars? y aca write porque reescribe y actualiza el archivo??;

    req.io.on('connection', socket=>{
        console.log("Cliente conectado.");
    })

    res.render('realTimeProducts', {newProductToAdd});
})

