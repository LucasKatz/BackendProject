import userModel from "../DAO/models/userModel.js"

const changeRol = async(req,res)=>{
    try{
        const id = req.params.uid

        //Comprobación de la existencia del usuario
        const response = await userModel.findOne({
            email: username,
        });
        if(!response){
            res.status(404).json({status:"error", message:"El usuario no está registrado"})
            return 
        }
    
        //Comprobación de rol del usuario
        if(userExist.role == "Admin"){
            res.status(400).json({status:"error", message:"El usuario es Admin, no es posible realizar el cambio de rol"})
            req.logger.error(`${req.method} en ${req.url}- ${new  Date().toLocaleTimeString()} - No es posible cambiar de rol un admin`)
            return
        }
    
        //Acciones para realizar el upgrade del usuario
        if(userExist.role == "Premium"){
            await userRepository.updatePropertyUsers(id,{role:"User"})
            let result = await userRepository.getIdUsers(id)
            req.logger.info(`${req.method} en ${req.url}- ${new  Date().toLocaleTimeString()} - ${result.email} nuevo rol: ${result.role}`)
            res.status(200).json({status:"success", payload: result})
        }
        else{
            await userRepository.updatePropertyUsers(id,{role:"Premium"})
            let result = await userRepository.getIdUsers(id)
            req.logger.info(`${req.method} en ${req.url}- ${new  Date().toLocaleTimeString()} - ${result.email} nuevo rol: ${result.role}`)
            res.status(200).json({status:"success", payload: result})
        }
    }
    catch(error){
        throw error
    }
}


export default changeRol