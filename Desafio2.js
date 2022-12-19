
const fs = require ('fs')

class ProductManager {

  static id = 1
    
    constructor (path){
      this.path = path
      this.products = this.readFile()

    }

    readFile () {
      const data = JSON.parse(fs.readFileSync('./$(this.path)', 'utf-8'))
      return data 
    }

    
    writeFile = async () =>  {
      try {
          await fs.promises.writeFileSync((ProductManager,products.JSON),
            this.path, JSON.stringify(products))
          } catch (err) {
          console.log("Oops! There has been a mistake")
          }
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


getProducts () {
  try {
    const productos =  fs.promises.readFile(this.file, 'utf-8')
     return JSON.parse(productos)    
     
 } catch (err) {
     if(err.message.includes ('no such file or directory')) return [];
     console.log("Oops! There has been a mistake")
 }
 console.log(products)
}

getProductsById (id)  {

  const search = getProducts.find(product => product.id === id) //asi el find??

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

deleteAll = async => {
    this.writeFile([])
}

const prod1 = new ProductManager(productos.JSON)

const prod2 = new ProductManager(productos.JSON)

//const prod3 = new ProductManager("", 3)


ProductManager.addProducts({
            title: "Lámpara Tokio",
            description: "Lámpara escritorio aluminio negro led",
            price: 2200,
            thumbnail: "ruta de imagen",
            code: 101,
            stock: 3,
            id:ProductManager.id,

            title: "Lampara Double Sh",
            description: "Embutido retraible doble cabezal móvil aluminio blanco led",
            price: 3200,
            thumbnail: "ruta de imagen",
            code: 102,
            stock: 4,
            id:ProductManager.id
})


getProducts()









