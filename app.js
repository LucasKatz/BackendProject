//Estos imports que dejo aca, son necesarios para usarlos abajo con app.use... o estoy haciendo lo mismo 2 veces??

import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

// Instancia de expres y servidor.
const express = require ('express')
const app = express()

//const ProductManager = require ('../desafio3')
//const productManager = new ProductManager('./database/productos.JSON')
const PORT = 8080

const socketServer=new Server(httpServer);
app.listen(PORT, () => {
    console.log (`Server running on port ${PORT}`)
    })

const httpServer = app.listen(PORT, () => {

    console.log (`Server running on port ${PORT}`)
        
    })    




// Configuracion Express.
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Rutas.
app.use('/api/carts', cartsRouter);
app.use('/api/products', productsRouter);
app.use('/', viewsRouter);

//app.get('/', async(req,res) => {
//    res.render('home',{});
//});

//socketServer.on('connection', (socket) => {
//    socket.on('mensaje',(msj) => {
//        console.log('Recibi un mensaje que dice: '+msj);
//    });
//    socket.emit('singlecast', 'Este es un mensaje singlecast');
//});

//Teniendo todo en viewsRouter esto no es necesario, no?


//app.get ('/products', async (req,res)=>{
//const products = await productManager.getProducts();
//const {limit} = req.query
//if (limit) return res.json(products.slice(0,limit))
//else return res.json(products)
//})

//app.get ('/products/:pid', async (req,res)=>{
    //const products = await productManager.getProducts();
    //const {pid} = req.params
    //const product = products.find (products => products.id === parseInt(pid))

    //if (product) return res.status(200).json(product)
    //else return res.status(404).json({message:'Product not found'});
//})

