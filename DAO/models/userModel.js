import mongoose from "mongoose";

const userCollection = "usuarios";
const documentSchema = new mongoose.Schema({
    name: String,
    reference: String,
});

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true,
    },
    age: Number,
    password: String,
    rol: {
        type: String,
        default: 'Usuario'
    },
    cartID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    documents: [documentSchema],
    last_connection: {
        type: Date,
        default: null
    }
});




const userModel = mongoose.model(userCollection, userSchema);

export default userModel;