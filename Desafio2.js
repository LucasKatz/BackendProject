
const fs = require ('fs')

class ProductManager {

  static id = 1
    
    constructor (path){
      this.path = path
      this.products = this.readFile()

    }
    writeData(){
        let dataString = JSON.stringify(data);
        fs.writeFileSync(`./${this.path}`, dataString)
    }

    readFile () {
        const data = JSON.parse(fs.readFileSync('./$(this.path)', 'utf-8'))
        return data 
    }

    addProducts(product) {     
        
        //Aca llamar this o crear variable trayendo los products usando readfile() o getProducts()
        let listado = this.readFile();
        const checkInCart = this.listado.find(p => p.id === product.code)

        if (!product.title || !product.description || !product.price ||
            
            !product.thumbnail || !product.code || !product.stock) {
                
                throw new Error('Todos los campos son obligatorios'); 
            } else if (checkInCart){
                console.log("ERROR - Please check the information and try again")
            }
        else {
            
            
            product.id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
            products.push(product)
            this.writeData(data)
                             
        }
    }
            
         
        
    getProducts () {
        try {
          const productos =  fs.promises.readFile(this.path, 'utf-8')
           return JSON.parse(productos)    
           
       } catch (err) {
           if(err.message.includes ('no such file or directory')) return [];
           console.log("Oops! There has been a mistake")
       }
       console.log(products)
      }    
    
    writeFile(products){  
        try {
             fs.promises.writeFileSync(this.path,JSON.stringify(products))
            } catch (err) {
            console.log("Oops! There has been a mistake")
            }      
    }    
    


// const isInCart = (id) => { return products.find (product =>product.title ===title) }


getProductsById (id){
    //Aca crear una variable trayendo los productos usando getProducts() o readFile() 
    let listaProductos = this.readFile();
    const products = this.listaProductos
    // const products = this.xxxx

  const search = products.find(product => product.id === id) //asi el find??

if (search == undefined) {
  console.log( "Product not found")
}
else {
    //retornarlo para cuando se llame el metodo
  return search 
}
}

isInProducts  (title)  {
    products.find (prod => prod.title === title)
}




updateProduct(id, product){
  
    let data = this.readFile ();
    if(data.find(product=>product.id===id)){
        let productDeleted = data.filter(product => product.id!==id)
        product.id=id;
        productDeleted.push(product);
        this.writeData(productDeleted);
        return productDeleted;

    }
    else{
        console.log('The product to be updated does not exist')
    }
}


async deleteProduct (id){
    let productos = await  this.readFile(productos.JSON) //Aca no estes getAll debes llamar getProducts() o readFile()
    try {
       productos = productos.filter (producto =>producto.id != id )
    this.writeFile(productos)
        
    } catch (err) {
        console.log("Oops! There has been a mistake")
    }
}

deleteAll(){
    this.writeFile([])
}
}


const prod1 = new ProductManager('./this.path')//aca pasar ruta del archivo a crear lo toma this.path




prod1.updateProduct(1,{
            title: "Lámpara Tokio",
            description: "Lámpara escritorio aluminio negro led",
            price: 2200,
            thumbnail: "ruta de imagen",
            code: 101,
            stock: 3,
}) //Los productos pasarlo por separado y podes usar prod1 ya que estas instanciando a ProducManager

prod1.updateProduct(2,{
    title: "Lámpara Tokio",
    description: "Lámpara escritorio aluminio negro led",
    price: 3200,
    thumbnail: "ruta de imagen",
    code: 102,
    stock: 4,
}) 

prod1.updateProduct(3,{
    title: "Lámpara Tokio",
    description: "Lámpara escritorio aluminio negro led",
    price: 2500,
    thumbnail: "ruta de imagen",
    code: 103,
    stock: 5,
}) 



//Aca ejemplo como se debrian llamar 
//   console.log(prod1.getProductById(1));  
//   prod1.deleteProduct(6);
//   console.log(prod1.getProducts());