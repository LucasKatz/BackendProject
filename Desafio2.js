
const fs = require ('fs')

const products = []

class ProductManager {

  static id = 1
    
    
    constructor (title, description, price, thumbnail, code, stock){
       
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        ProductManager.id

    }

    
    addProducts() {
        
      
        const product= ({
            title: this.title,
            description: this.description,
            price: this.price,
            thumbnail: this.thumbnail,
            code: this.code,
            stock: this.stock,
            id:ProductManager.id
          
        })

        const checkInCart = products.find(element => element.code === product.code)
        if(checkInCart == true) {
            console.log("ERROR - Please check the information and try again")
        }
        else {
            products.push(product)
            ProductManager.id++
            
        } 

       
          if (!product.title || !product.description || !product.price ||

            !product.thumbnail || !product.code || !product.stock) {
  
          throw new Error('Todos los campos son obligatorios');
  
        }
          
        }
      
    }  



const isInCart = (id) => { return products.find (product =>product.title ===title) }


const getProducts = () =>  {

    console.log(products)

}


const getProductsById = (id) => {

  const search = products.find(product => product.id === id)

if (search == undefined) {
  console.log( "Product not found")
}
else {
  console.log(search)
}
}
const isInProducts = (title) => {
    products.find (prod => prod.title === title)
}



fs.writeFile = async () =>  {
    try {
        await fs.promises.writeFile((ProductManager,products.JSON),
            this.file, JSON.stringify(products.JSON)
        )
    } catch (err) {
        console.log("Oops! There has been a mistake")
    }
}

getAll = async () =>  {
    try {
       const productos = await fs.promises.readFile(this.file, 'utf-8')
        return JSON.parse(productos)    
        
    } catch (err) {
        if(err.message.includes ('no such file or directory')) return [];
        console.log("Oops! There has been a mistake")
    }
}




updateProduct = () => {const arr = [ProductManager];
  
  const newArr = arr.map(object => {
    if (object.id === 2) {
    
      return {...object, //valor a sobreescribir
    };
    }
    return object;
  });
  
  console.log(newArr);   
}


deleteProduct  = async id =>  {
    let productos = await  this.getAll()
    try {
       productos = productos.filter (producto =>producto.id != id )
    await this.writeFile(productos)
        
    } catch (err) {
        console.log("Oops! There has been a mistake")
    }
}

//deleteAll = async => {
//    this.writeFile([])
//}

const prod1 = new ProductManager("Lámpara Tokio", "Lámpara escritorio aluminio negro led", 2200, "ruta de imagen", 101, 3)

const prod2 = new ProductManager("Lampara Double Sh", "Embutido retraible doble cabezal móvil aluminio blanco led", 3000,"ruta de imagen", 102, 2)

//const prod3 = new ProductManager("", 3)


prod1.addProducts()

prod2.addProducts()

//prod3.addProducts()

getProducts()









