import mongoose from "mongoose";
import { v4 as uuidv4 } from 'uuid';

const myUUID = uuidv4();
const userCollection = "usuarios";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type:String,
        unique:true,
    },
    age: Number,
    password: String,
    rol: {
        type: String,
        default: 'Usuario'
    },

    cartID:{
        type: String,
        default: uuidv4()
    }

});

const userModel = mongoose.model(userCollection, userSchema);

export default userModel;