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

    // Encuentra el cartID en userModel
    const user = await userModel.findOne({ cartID: cartId });
    console.log(user)

    if (user) {
      // Obtiene los productos del carrito utilizando cartModel y el cartID del usuario
      const cart = await cartModel.findOne({ cartID: cartId }).lean().populate("products.product");

      console.log(cart)

      if (cart) {
        res.status(200).send(cart);
        return cart;
      } else {
        res.status(400).send("El Cart solicitado no contiene productos");
      }
    } else {
      res.status(400).send("El cartID no está asociado a ningún usuario");
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


export const addProductToCart = async (req, res) => {
  const cartId = req.params.cid;
  console.log(cartId);
  const productId = req.params.pid.trim();
  console.log(productId);
  const { quantity } = req.body;

  const productExist = await productModel.findById(productId);
  const cartExist = await cartModel.findOne({ cartID: cartId });
  console.log(cartExist);

  if (!productExist) {
    res.status(400).send({ error: "No existe un producto con la Id ingresada" });
    return;
  } else if (!cartExist) {
    res.status(404).send({ error: "No existe un usuario con el cartID ingresado" });
    return;
  }

  // Comprobar quién es el creador del producto
  if (req.session.user.rol == "Premium" && req.session.user.email == productExist.owner) {
    res.status(400).send({ status: "error", message: "El usuario no está autorizado" });
    return;
  }

  // Obtén el carrito asociado al usuario
  if (!cartExist) {
    res.status(404).send({ error: "No existe un carrito asociado al usuario" });
    return;
  }

  // Comprobación de stock
  const checkStock = productExist.stock;
  if (parseInt(quantity) > checkStock) {
    res.status(400).send({ status: "Error", message: "No hay stock suficiente" });
    return;
  }

  try {
    let selectedCart = cartExist;
    let productExistInCart = selectedCart.products?.find(
      (product) => product.product.toString() === productId
    );
    console.log(productExist);

    if (productExistInCart == undefined) {
      if (!selectedCart.products) {
        selectedCart.products = [];
      }
      selectedCart.products.push({ product: productId, quantity: quantity });
    } else {
      let newQuantity = productExistInCart.quantity + quantity;
      let productIndex = selectedCart.products.findIndex(
        (product) => product.product.toString() === productId
      );
      selectedCart.products[productIndex].quantity = newQuantity;
    }

    let result = await selectedCart.save();

    res.status(200).send({ message: "Producto agregado al carrito", selectedCart, result });
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

    const response = await cartModel.findOneAndUpdate(
      { cartID: cartId },
      { $pull: { products: { product: productToDelete } } },
      { new: true }
    );

    if (response) {
      res.status(200).send({ message: "Producto Eliminado", response });
    } else {
      res.status(404).send({ message: "El producto no se encuentra en el carrito" });
    }
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