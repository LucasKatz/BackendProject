import passport from "passport";
import local from "passport-local"
import userModel from "../DAO/models/userModel.js";
import { createHash, isValidPassword } from "../utils";

const localStrategy = local.Strategy;

const initializePassport = () => {

    passport.use('/signup', new localStrategy(
        {passReqToCallback:true, usernameField:'email'}, async (req,username,password,done)=>{
            const{first_name, last_name, email,age} = req.body;
            
            try {
                let user = await userModel.findOne({email:username})
                if (user){
                    console.log("El usuario ya está registrado")
                    return done (null,false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    password: createHash(password),
                    age,
                }
                let result = await userModel.create (newUser);
            }
            catch (error){
                return done ("Error al obtener el usuario" + error)
            }
        }
    )
    )
}

export default initializePassport