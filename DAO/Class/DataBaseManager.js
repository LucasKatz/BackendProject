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


class ProductManager {
    async read() {
        try {
          const products = await productModel.find();
          return products;
        } catch (err) {
          throw err;
        }
      }
    
      async create() {
        try {
          const newProduct = new productModel();
          await newProduct.save();
          return newProduct;
        } catch (err) {
          throw err;
        }
      }
      async delete(productId) {
        try {
          const result = await productModel.findByIdAndDelete(productId);
          return result;
        } catch (err) {
          throw err;
        }
      }
    }


export { CartManager, ProductManager };