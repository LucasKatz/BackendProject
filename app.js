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




// Configuracion Express.
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));


// Rutas.
app.use('/', viewsRouter);


