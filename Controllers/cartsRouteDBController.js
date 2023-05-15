import { Router } from "express";
import DATA from "../DAO/factory.js";
import productModel from "../DAO/models/productsModel.js";
import cartModel from "../DAO/models/cartsModel.js";
import userModel from "../DAO/models/userModel.js";
import mongoose from "mongoose";

const  {CartManager}  = DATA;
const cartManager = new CartManager();

export const noStockProducts = []

export const readProductsInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    console.log(cartId)
    const findCart = await userModel
      .findOne({ cartID: cartId })
      .populate("products");
    if (findCart != undefined) {
      res.status(200).send(findCart);
      return findCart;
    } else {
      res.status(400).send("El Cart solicitado no existe");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const newCart = async (req, res) => {
  try {
    await cartManager.create();
    res.status(200).send("Carrito creado");
  } catch (err) {
    //req.logger.error(`${req.method} en ${req.url}- ${new  Date().toISOString()}`)
    res.status(500).send(err.message);
  }
};

/*export const addProductToCart = async (req, res) => {

  //req.role !== "user" ? res.status(401).send("Usuario no autorizado"):null;
  const cartId = req.params.cid;
  console.log(cartId)
  const productId = req.params.pid;
  const { quantity } = req.body;

  //Comprobación de la estructura y validez de la Id de producto y la Id del carrito recibidos por parámetro
  /*if (productId.trim().length != 24) {
    res.status(400).send({ error: "La Id de producto ingresada no es válida" });
    return;
  } else if (cartId.trim().length != 24) {
    res.status(404).send({ error: "La Id del Cart ingresada no es válida" });
    return;
  }
  const productExist = await productModel.findById(productId);
  const cartExist = await cartModel.findById(cartId);

  if (productExist == null) {
    res
      .status(400)
      .send({ error: "No existe un producto con la Id ingresada" });
    return;
  } else if (cartExist == null) {
    res.status(404).send({ error: "No existe un Cart con la Id ingresada" });
    return;
  }

  //Comprobación de stock
  let checkStock = productExist.stock;
  if (parseInt(quantity) > checkStock) {
    productExist.push(noStockProducts)
    res
      .status(400)
      .send({ status: "Error", message: "No hay stock suficiente" });
    return;
  }

  //Si se comprueba la validez de los parámetros se ejecutan las acciones para agregar el producto al carrito
  try {
    let selectedCart = await cartModel.find({ _id: cartId });
    let productExistInCart = selectedCart[0].products.find(
      (product) => product.product == productId
    );

    if (productExistInCart == undefined) {
      selectedCart[0].products.push({ product: productId, quantity: quantity });
    } else {
      let newQuantity = productExistInCart.quantity + quantity;
      let productIndex = selectedCart[0].products.findIndex(
        (product) => product.product == productId
      );
      selectedCart[0].products[productIndex].quantity = newQuantity;
    }

    let result = await cartModel.updateOne({ _id: cartId }, selectedCart[0]);

    res
      .status(200)
      .send({ message: "Producto agregado al carrito", selectedCart, result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};*/



export const addProductToCart = async (req, res) => {
  const cartId = req.params.cid;
  console.log(cartId);
  const productId = req.params.pid;
  console.log(productId);
  const { quantity } = req.body;

  // Comprobación de la estructura y validez de la Id de producto y la Id del carrito recibidos por parámetro
  const isValidObjectId = mongoose.Types.ObjectId.isValid(productId);
  if (!isValidObjectId) {
    res.status(400).send({ error: "La Id de producto ingresada no es válida" });
    return;
  }

  const productExist = await productModel.findOne({ id: productId });
  const cartExist = await cartModel.findById(cartId);

  if (!productExist) {
    res.status(400).send({ error: "No existe un producto con la Id ingresada" });
    return;
  } else if (!cartExist) {
    res.status(404).send({ error: "No existe un Cart con la Id ingresada" });
    return;
  }

  // Comprobación de stock
  const checkStock = productExist.stock;
  if (parseInt(quantity) > checkStock) {
    res.status(400).send({ status: "Error", message: "No hay stock suficiente" });
    return;
  }

  try {
    let selectedCart = await cartModel.find({ _id: cartId });
    let productExistInCart = selectedCart[0].products.find(
      (product) => product.product.toString() === productId
    );

    if (productExistInCart == undefined) {
      selectedCart[0].products.push({ product: productId, quantity: quantity });
    } else {
      let newQuantity = productExistInCart.quantity + quantity;
      let productIndex = selectedCart[0].products.findIndex(
        (product) => product.product.toString() === productId
      );
      selectedCart[0].products[productIndex].quantity = newQuantity;
    }

    let result = await cartModel.updateOne({ _id: cartId }, selectedCart[0]);

    res
      .status(200)
      .send({ message: "Producto agregado al carrito", selectedCart, result });
  } catch (err) {
    res.status(500).send(err.message);
  }
};


export const deleteCart = async (req, res) => {
  const { id } = req.params.cid;
  try {
    const response = await cartManager.delete(id);

    res.status(200).send({ message: "Carrito eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const deleteSelectedProduct = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productToDelete = req.params.pid;
    const response = await cartManager.deleteOne(cartId, productToDelete);

    res.status(200).send({ message: "Producto Eliminado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateProducts = async (req, res) => {
  const cartId = req.params.cid;
  const product = req.body;
  try {
    const response = await cartManager.update(cartId, product);
    res.status(200).send({ message: "Carrito actualizado", response });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const updateStockInCart = async (req, res) => {
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const { quantity } = req.body;

    await cartManager.updateProductInCart(cartId, productId, quantity);

    res.status(200).send({ message: "Stock actualizado", response });
  } catch (error) {
    
    res.status(404).send({ status: "error", message: error.message });
  }
};