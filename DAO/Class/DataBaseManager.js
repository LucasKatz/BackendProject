import cartModel from "../models/cartsModel.js";
import productModel from "../models/productsModel.js";

class CartManager {
  async read() {
    try {
      const carts = await cartModel.find();
      return carts;
    } catch (err) {
      throw err;
    }
  }

  async create() {
    try {
      const newCart = new cartModel();
      await newCart.save();
      return newCart;
    } catch (err) {
      throw err;
    }
  }
  async delete(cartId) {
    try {
      const result = await cartModel.findByIdAndDelete(cartId);
      return result;
    } catch (err) {
      throw err;
    }
  }
}