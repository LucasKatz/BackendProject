export const  authMiddleware = async (req,res,next)=>{
    if(req.session?.user != undefined){
    return next()
    }
    return res.status(401).redirect("/login?message=Debe loguearse para acceder a esta seccion")
    
}

//Si el usuario NO es "Admin" (por ende posee rol de "Usuario" o rol "Premium") pueden acceder al chat

export const checkUserRol = async (req, res, next) => {
    if (req.session?.user?.rol === 'Usuario') {
        return next();
    }
    return res
    .status(401)
    .redirect("/login?message=Debe loguearse como Usuario para acceder a esta seccion");
};



//Middleware para userPremium - falta terminar
export const  authMiddleware2 = async (req,res,next)=>{
    if(req.session?.user != undefined || user.rol){
    return next()
    }
    return res.status(401).redirect("/login?message=Debe loguearse para acceder a esta seccion")
    
}
export default authMiddleware