import mongoose from "mongoose";

const cartCollection = "carts";

const cartSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product:{
          type:mongoose.Schema.Types.ObjectId,
          ref: "products",
        },
        quantity: Number
      },
    ],
    default: [],
  },
});

cartSchema.pre('find', function(){
  this.populate('product', 'products')
})

const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;