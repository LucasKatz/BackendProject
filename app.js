import __dirname from './utils.js';
import mongoose from 'mongoose';
import chatRoute from './routers/chatRouter.js'
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import fs from "fs"
import viewsRouter from './routers/viewsRouter.js';

const app = express()
const PORT = 8080

const messages = []

// Configuracion Express.
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set("/public/views")
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/chat", chatRoute);

// Rutas.
app.use('/', viewsRouter);


const readJson= async () => {
    const data = await fs.readFileSync("./database/productos.JSON" , "utf-8");
    const products = await JSON.parse(data);
    return products;
}

const writeJson= async (data) => {
    const dataToWrite = await JSON.stringify(data, null, "\t");
    await fs.writeFileSync ("./database/productos.JSON" , dataToWrite);
};


const httpServer = app.listen(PORT, () => {

    console.log (`Server running on port ${PORT}`)
    })    

    const socketServer=new Server(httpServer);

socketServer.on('connection', (socket) => {
    console.log('nuevo user conectado');

    socket.on('message', async(data) => {
        let productos = await readJson()

        productos.push({title: data})

        await writeJson (productos)

        socketServer.emit("paragraph", productos); //productos lee el archivo
    });
})








