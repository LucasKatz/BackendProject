import __dirname from './utils.js';
import chatRoute from "./routers/chatRouter.js";
import express from 'express';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import messageRoute from "./routers/messageRouter.js"
import fs from "fs"
import viewsRouter from './routers/viewsRouter.js';

import mongoose from "mongoose";
import * as dotenv from "dotenv";

const app = express()
const PORT = 8080
dotenv.config();

const messages = []

// Configuracion Express.
app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/public/views');
app.set("/public/views")
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post("/socketMessage", (req, res) => {
    const { message } = req.body;
    socketServer.emit("message", message);

    res.send("ok");
});

// Rutas.
app.use('/', viewsRouter);
app.use("/chat", chatRoute);
app.use("/messages", messageRoute)


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


socketServer.on("chatConnection", (socket) => {
    console.log("Nuevo cliente conectado!");
    socket.on("new-user", (data) => {
        socket.user = data.user;
        socket.id = data.id;
        socketServer.emit("new-user-connected", {
        user: socket.user,
        id: socket.id,
        });
    });
    socket.on("message", (data) => {
        messages.push(data);
        socketServer.emit("messageLogs", messages);
        messageModel.create(data);
    });
});

mongoose.connect (
    `mongodb+srv://${process.env.USER_MONGO}:${process.env.PASS_MONGO}@codercluster.vdti2wf.mongodb.net/?retryWrites=true&w=majority`,
    (error) => {
        if (error) {
            console.log("Error al conectar a la base de datos");
        } else {
            console.log("Conectado a la base de datos");
        }
    }
)




