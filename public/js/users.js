import userModel from './models/user.model.js';
import cartModel from './models/cart.model.js';

document.getElementById("verProductos").addEventListener("click", function(){
    window.location.href="/products "
})


class UserDB{

    constructor(){}

    async addNewUser(userToBeAdded){
        let cart = await cartModel.create({});

        userToBeAdded.cart = cart["_id"];

        return userModel.create(userToAdd);
    }

    findUser(email, pass){
        return userModel.find({email, password:pass});
    }

}


export default UserDB;