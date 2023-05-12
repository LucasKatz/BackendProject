import userModel from "../DAO/models/userModel.js"

export const changeRol = async(req,res)=>{
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
        if(session.user.rol == "Admin"){
            res.status(400).json({status:"error", message:"El usuario tiene el rol de Administrado, por lo tanto no es posible realizar el cambio de rol"})
            return
        }
    
        //Acciones para realizar el upgrade del usuario
        if(session.user.rol == "Premium"){
            await userModel.findByIdAndUpdate(id,{role:"User"})
            let result = await userModel.findByOne({
                email: username,
            });
            res.status(200).json({status:"success", payload: result})
        }
        else{
            await userModel.findByIdAndUpdate(id,{role:"Premium"})
            let result = await userModel.findByOne({
                email: username,
            });
            res.status(200).json({status:"success", payload: result})
        }
    }
    catch(error){
        throw error
    }
}


export default changeRol