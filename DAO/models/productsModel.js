import mongoose from "mongoose";

const productCollection = "products";

const productSchema = new mongoose.Schema({
  id:{
    type:Number,
    unique:true,
  },
  title: String,
  description: String,
  code: String,
  price: Number,
  thumbnail: String,
  stock: Number,
  category: String,
  status: Boolean,
});

const productModel = mongoose.model(productCollection, productSchema);

export default productModel;