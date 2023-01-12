const express = require("express");
const routerProducts = express.Router();
const fs = require ('fs')


const productosDB = JSON.parse(fs.readFileSync('./database/productos.JSON', 'utf-8'))

routerProducts.get("/", (req, res) => {
    const {limit} = req.query

    if (limit) return res.json(productosDB.slice(0,limit))
    else return res.json(productosDB)
});

routerProducts.get('/:pid', (req, res) => {

    const {pid} = req.params 
    const producto = productosDB.find((product) => product.id == +pid);

    res.status(200).json({
        message: 'Producto Encontrado',
        producto
        })
});

routerProducts.post('/', (req, res) => {

    let producto = req.body
    let id = productosDB.length > 0 ? productosDB[productosDB.length - 1].id + 1 : 1

    let productoNuevo = { id, ...producto}
    if (productoNuevo) {

        productosDB.push(productoNuevo)
        fs.writeFileSync('./database/productos.JSON', JSON.stringify(productosDB))
        
        return res.status(200).json(
            {
                message: 'Producto Agregado', 
                productoNuevo
            });        
    }  else {
        res.status(400).json({
            message: 'Error'
        });
    }
})

routerProducts.put('/:pid', (req, res) =>{
    // Usar params y body

    /*
    - Traer logica del updateProduct, el this.readFile no hace falta debes modificar el find y filter por productosDB.xxxxxx
    - La igualacion debe ser al pid recibido por params tanto en find como en filter
    - Traer el producto de body y agregarle el id (Como se hace en el post)
    - Ese producto traido ya con el id, pushearlo al array que genero el filter.
    - Escribir el archivo con fs, pasandole el nuevo array 
    - Enviar respuesta por res con el producto y mensaje
    - En el else enviar por res el mensaje de error
    
    */
    
})

routerProducts.delete('/:pid', (req, res) =>{

    // Usar params para el id

    /* 
    - Traer logica del deleteProduct, el this.readFile no hace falta.
    - Debes modificar filter por productosDB.xxxxxx
    - Cambiar el id que iguala por el de params
    - Escribir el archivo con fs, pasandole el nuevo array 
    - Enviar una respuesta por res
    - En el else enviar mensaje de error por res.
    */
})



module.exports = routerProducts
  