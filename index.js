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
        if(checkInCart && validar == true) {
            console.log("ERROR - Please check the information and try again")
        }
        else {
            products.push(product)
            ProductManager.id++
            
        } 

        function validar(){
          elementos = product;
          for(i=0;i<elementos.length;i++){
            if(elementos.product.value = false){
            return  false
            } else {
              return true 
            }
          }
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




const prod1 = new ProductManager("Lámpara Tokio", "Lámpara escritorio aluminio negro led", 2200, "ruta de imagen", 101, 3)

const prod2 = new ProductManager("Lampara Double Sh", "Embutido retraible doble cabezal móvil aluminio blanco led", 3000,"ruta de imagen", 102, 2)

const prod3 = new ProductManager("", "dfjsjfsdgfj", 3)


prod1.addProducts()

prod2.addProducts()

prod3.addProducts()

getProducts()


