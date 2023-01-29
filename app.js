//Estos imports que dejo aca, son necesarios para usarlos abajo con app.use... o estoy haciendo lo mismo 2 veces??
import __dirname from './utils.js';
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

import viewsRouter from './routers/viewsRouter.js';

const PORT = 8080

const socketServer=new Server(httpServer);

socketServer.on('connection', (socket) => {
    socket.on('mensaje',(msj) => {
        console.log('Recibi un mensaje que dice: '+msj);
    });
})
//a esto te referis con instanciar?

const httpServer = app.listen(PORT, () => {

    console.log (`Server running on port ${PORT}`)
    
    })    

    io.on("connection", (socket) => {
    
    console.log("nuevo user conectado");

    const io = new Server(httpServer);

    socket.on("message", async (data) =>
    
    { let productos = await readJson()
    
    productos.push({prod: data})
    
    await writeJson (productos)
    
    io.emit("paragraph", productos);
    
    });
    
    });
//Mi archivo de productos se llama productos.JSON, pero con que ponga productos ya está, no? O las variables que provienen de donde son las que tengo que leer?


// Configuracion Express.
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Rutas.
app.use('/', viewsRouter);


