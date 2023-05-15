import DATA from "../DAO/factory.js";
import productModel from "../DAO/models/productsModel.js";
import CustomMistake from "../mistakes/customMistake.js";
import Errores from "../mistakes/kindOfError.js";
import { ProductsMistakeInfo } from "../mistakes/mistakeMiddleware.js";

const { ProductManager } = DATA;
console.log(DATA);
const productManager = new ProductManager();

export const paginatedProducts = async (req, res) => {
  const stock = req.query.stock;
  const page = req.query.page;
  const limit = req.query.limit || 10;
  const sort = req.query.sort || 1;
  let query;
  let prevURL;
  let nextURL;

  const url = req.protocol + "://" + req.get("host") + req.originalUrl;
  const category = req.query.category;
  if (category != undefined || stock != undefined) {
    if (category != undefined) {
      query = { category: category };
    } else {
      query = { stock: stock };
    }
  } else {
    if (category != undefined && stock != undefined) {
      query = { category: category, stock: stock };
    } else {
      query = {};
    }
  }
  try {
    const listproducts = await productModel.paginate ({}, {lean:true})
    let response = listproducts.docs
      query,
      {
        page: page || 1,
        limit: limit,
        sort: { price: sort },
      },{lean:true},
      (err, res) => {
        res.hasPrevPage
          ? (prevURL = url.replace(`page=${res.page}`, `page=${res.prevPage}`))
          : null;
        res.hasNextPage
          ? (nextURL =
              page == undefined
                ? url.concat(`&page=${res.nextPage}`)
                : url.replace(`page=${res.page}`, `page=${res.nextPage}`))
          : null;
        return {
          status: res.docs.length != 0 ? "success" : "error",
          payload: res.docs,
          totalPages: res.totalPages,
          prevPage: res.prevPage,
          nextPage: res.nextPage,
          page: res.page,
          hasPrevPage: res.hasPrevPage,
          hasNextPage: res.hasNextPage,
          prevLink: prevURL,
          nextLink: nextURL,

        };
      },
    res.render("products", { products: response });
  } catch (err) {
    res.send(err);
  }
};

export const postProducts = async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
    status,
  } = req.body;

  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !thumbnail ||
    !stock ||
    !category ||
    !status
  ) { 
    CustomMistake.createError({
      name: "Error al agregar producto",
      cause: ProductsMistakeInfo({
        title,
        description,
        code,
        price,
        thumbnail,
        stock,
        category,
        status,
      }),
      message:"Error al intentar agregar un nuevo producto a la DB",
      code: Errores.TIPO_INVALIDO
  })
    res.status(400).send({ error: "Faltan Datos" });
    return;
  }

  let owner;
  if(req.session.user){
    if(req.session.user.role == "Premium"){
      owner = req.session.user?.email?req.session.user.email:undefined //Para el caso que el usuario proviene de github el email es null  
    }
  }

  try {
    const response = await productModel.create({
      owner,
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    });
    res.status(200).send({ message: "Producto creado", response });
  } catch (err) {
    //req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()}`)
    res.status(500).send(err.message);
  }
};

export const deleteProduct = async (req, res) => {
  const  id  = req.params.id;
  console.log (id)

  //Comrpobación de la existencia del producto
  const found = await productModel.findById(id);

  if(found==null){
    res.status(400).send({error:"El producto solicitado no existe"})
    return 
  }

   //Comprobación del rol del usuario para eliminar productos
  /*if(req.session.user.role == "Premium" && req.session.user.email != productExist.owner){
    req.logger.warning(`${req.method} en ${req.url}- ${new  Date().toISOString()} - Usuario no autorizado`)
    res.status(401).send({status:"error", message:"Usuario sin autorización"})
    return
  }*/

  try {
    const response = await productModel.findByIdAndDelete(id);
    res.status(200).send({ message: "Producto eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }

};


export const showSpecificProduct = async (req, res) => {
  const  id  = req.params.pid;
  if (typeof id !== 'string') {
    return res.status(400).send('El id debe ser una cadena de texto');
  }
  try {
    const response = await productModel.findById(id);
    res.status(200).send({ message: "Detalles de su Producto", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateSpecifiedProduct = async (req, res) => {
  const  id  = req.params.id;
  console.log(id)
  const {
    title,
    description,
    code,
    price,
    thumbnail,
    stock,
    category,
    status,
  } = req.body;
  console.log(req.body);
  if (
    !title ||
    !description ||
    !code ||
    !price ||
    !thumbnail ||
    !stock ||
    !category||
    !status
  ) {
    res.status(400).send({ error: "Faltan datos" });
    return;
  }
  try {
    const result = await productModel.findByIdAndUpdate(id, 
    {
      title,
      description,
      code,
      price,
      thumbnail,
      stock,
      category,
      status,
    } ,
    { new: true } );
    res.status(200).send({ message: "Producto actualizado", result });
    //console.log(result)
  } catch (err) {
    res.status(500).send(err.message);
  }
};