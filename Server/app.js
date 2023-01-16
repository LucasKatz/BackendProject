const express = require ('express')
const app = express()
const ProductManager = require ('../desafio3')
const productManager = new ProductManager('./database/productos.JSON')
const PORT = 8080
const {Server}=require('socket.io')
const socketServer=new Server(httpServer);

app.engine('handlebars',handlebars.engine());
app.set('views',__dirname+'/views');
app.set('view engine','handlebars');
app.use(express.static(__dirname+'/public'));

app.get('/',(req,res) => {
    res.render('index',{});
});

socketServer.on('connection', (socket) => {
    socket.on('mensaje',(msj) => {
        console.log('Recibi un mensaje que dice: '+msj);
    });
    socket.emit('singlecast', 'Este es un mensaje singlecast');
});


app.get ('/products', async (req,res)=>{
const products = await productManager.getProducts();
const {limit} = req.query
if (limit) return res.json(products.slice(0,limit))
else return res.json(products)
})

app.get ('/products/:pid', async (req,res)=>{
    const products = await productManager.getProducts();
    const {pid} = req.params
    const product = products.find (products => products.id === parseInt(pid))

    if (product) return res.status(200).json(product)
    else return res.status(404).json({message:'Product not found'});
})

app.listen(PORT, () => {
console.log (`Server running on port ${PORT}`)
})